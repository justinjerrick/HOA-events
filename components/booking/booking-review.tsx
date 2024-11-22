"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInDays, format } from "date-fns";
import { CalendarDays, Users } from "lucide-react";
import { useBooking } from "@/context/booking-context";

export function BookingReview() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { state } = useBooking();

  useEffect(() => {
    if (!state.dateRange?.from || !state.dateRange?.to || !state.details) {
      router.push("/book/details");
    }
  }, [state.dateRange, state.details, router]);

  if (!state.dateRange?.from || !state.dateRange?.to || !state.details) {
    return null;
  }

  const numberOfDays = differenceInDays(state.dateRange.to, state.dateRange.from) + 1;
  const basePrice = 2000 * numberOfDays;
  const servicesTotal = state.services.reduce((sum, service) => sum + service.price, 0);
  const totalPrice = basePrice + servicesTotal;
  const depositAmount = 500;

  const handleBooking = async () => {
    try {
      setIsProcessing(true);
      // Here you would typically integrate with Square for payment
      // For now, we'll just simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push("/book/confirmation");
    } catch (error) {
      console.error("Error processing booking:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Review Your Booking</h1>
        <p className="text-gray-600 mt-2">
          Please review your selections before proceeding
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-x-2 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Event Type:</span>
            <span className="font-medium">{state.details.eventType}</span>
          </div>
          <div className="flex items-center gap-x-2 text-sm">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Dates:</span>
            <span className="font-medium">
              {format(state.dateRange.from, "MMM d, yyyy")} - {format(state.dateRange.to, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Attendees:</span>
            <span className="font-medium">{state.details.attendees}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-gray-600">Name:</span>{" "}
            <span className="font-medium">{state.details.name}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Email:</span>{" "}
            <span className="font-medium">{state.details.email}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Phone:</span>{" "}
            <span className="font-medium">{state.details.phone}</span>
          </p>
        </div>

        {state.services.length > 0 && (
          <>
            <Separator className="my-4" />
            <h2 className="text-xl font-semibold mb-4">Additional Services</h2>
            <div className="space-y-2">
              {state.services.map((service) => (
                <div key={service.id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-medium">${service.price.toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Space Rental ({numberOfDays} days)</span>
            <span className="font-medium">${basePrice.toLocaleString('en-US')}</span>
          </div>
          {servicesTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Additional Services</span>
              <span className="font-medium">${servicesTotal.toLocaleString('en-US')}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span>${totalPrice.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Required Deposit</span>
            <span>${depositAmount.toLocaleString('en-US')}</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/book/details")}
        >
          Back
        </Button>
        <Button
          onClick={handleBooking}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay Deposit ($${depositAmount.toLocaleString('en-US')})`}
        </Button>
      </div>
    </div>
  );
}