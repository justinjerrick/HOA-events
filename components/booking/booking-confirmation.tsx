"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking-context";

export function BookingConfirmation() {
  const router = useRouter();
  const { state } = useBooking();

  useEffect(() => {
    if (!state.dateRange?.from || !state.dateRange?.to || !state.details) {
      router.push("/book/details");
    }
  }, [state.dateRange, state.details, router]);

  if (!state.dateRange?.from || !state.dateRange?.to || !state.details) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for choosing House of Arts Events
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">1</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Check Your Email</p>
                  <p className="text-sm text-gray-600">
                    We've sent a confirmation email with all the details of your booking
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">2</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Schedule a Consultation</p>
                  <p className="text-sm text-gray-600">
                    Book a time to discuss your event details with our coordinator
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => window.open("https://calendly.com/your-link", "_blank")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">3</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Prepare for Your Event</p>
                  <p className="text-sm text-gray-600">
                    Review our venue guidelines and start planning your perfect event
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600">
              Our team is here to assist you with any questions. Contact us at{" "}
              <a href="mailto:support@houseofarts.com" className="text-primary">
                support@houseofarts.com
              </a>
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Link href="/">
          <Button>
            Return to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}