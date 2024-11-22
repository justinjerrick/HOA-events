"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useBooking } from "@/context/booking-context";
import type { DateRange } from "@/lib/types/booking";
import { addDays, format } from "date-fns";

export function DateSelection() {
  const router = useRouter();
  const { state, setDateRange } = useBooking();
  const [date, setDate] = useState<DateRange | undefined>(state.dateRange);

  const handleSelect = (value: DateRange | undefined) => {
    if (value?.from) {
      const range = {
        from: value.from,
        to: value.to || value.from,
      };
      setDate(range);
      setDateRange(range);
    } else {
      setDate(undefined);
    }
  };

  const handleContinue = () => {
    if (date?.from && date?.to) {
      router.push("/book/services");
    }
  };

  const disabledDays = {
    before: addDays(new Date(), 1),
    after: addDays(new Date(), 90),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Select Your Dates</h1>
        <p className="text-gray-600 mt-2">
          Choose the dates for your event
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Event Duration</h2>
            <Calendar
              mode="range"
              selected={date}
              onSelect={handleSelect}
              disabled={disabledDays}
              numberOfMonths={2}
              className="rounded-md border"
            />
          </div>

          {date?.from && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Selected Dates</h3>
              <p className="text-sm">
                From:{" "}
                <span className="font-medium">
                  {format(date.from, "MMMM d, yyyy")}
                </span>
              </p>
              {date.to && (
                <p className="text-sm">
                  To:{" "}
                  <span className="font-medium">
                    {format(date.to, "MMMM d, yyyy")}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/book/space")}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!date?.from || !date?.to}
          className="w-full sm:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}