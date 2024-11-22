"use client";

import { BookingProvider } from "@/context/booking-context";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useBooking } from "@/context/booking-context";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    id: "space",
    name: "Select Space",
    path: "/book/space",
  },
  {
    id: "date",
    name: "Select Dates",
    path: "/book/date",
  },
  {
    id: "services",
    name: "Add Services",
    path: "/book/services",
  },
  {
    id: "details",
    name: "Event Details",
    path: "/book/details",
  },
  {
    id: "review",
    name: "Review",
    path: "/book/review",
  },
];

function BookingSummary() {
  const { state } = useBooking();
  const numberOfDays = state.dateRange?.from && state.dateRange?.to
    ? Math.ceil((state.dateRange.to.getTime() - state.dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
  const basePrice = numberOfDays * 2000;
  const servicesTotal = state.services.reduce((sum, service) => sum + service.price, 0);
  const totalPrice = basePrice + servicesTotal;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
        <div className="space-y-4">
          {/* Space Information */}
          <div>
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                alt="The Grand Hall"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-medium">The Grand Hall</h4>
            <p className="text-sm text-gray-500">Premium Event Space</p>
            <p className="text-sm font-medium mt-1">$2,000 per day</p>
          </div>

          <Separator />

          {/* Event Details */}
          {state.details && (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Event Type:</span>{" "}
                <span className="font-medium">{state.details.eventType}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Attendees:</span>{" "}
                <span className="font-medium">{state.details.attendees}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {state.dateRange?.from && state.dateRange?.to && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Selected Dates</h4>
            <p className="text-sm">
              {format(state.dateRange.from, "MMM d, yyyy")} -{" "}
              {format(state.dateRange.to, "MMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Duration: {numberOfDays} day{numberOfDays !== 1 ? "s" : ""}
            </p>
          </div>
        </>
      )}

      {state.services.length > 0 && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Additional Services</h4>
            <div className="space-y-1">
              {state.services.map((service) => (
                <div key={service.id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-medium">${service.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {(basePrice > 0 || servicesTotal > 0) && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-2">Price Breakdown</h4>
            {basePrice > 0 && (
              <div className="flex justify-between text-sm">
                <span>Space Rental ({numberOfDays} days)</span>
                <span className="font-medium">${basePrice.toLocaleString()}</span>
              </div>
            )}
            {servicesTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span>Additional Services</span>
                <span className="font-medium">${servicesTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

function StepCounter() {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex(step => step.path === pathname);
  
  if (currentStepIndex === -1) return null;

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-2">
      <span className="font-medium text-primary">Step {currentStepIndex + 1}</span>
      <span className="text-gray-400">/</span>
      <span className="text-gray-500">{steps.length}</span>
      <span className="text-gray-400 mx-2">•</span>
      <span className="text-gray-600">{steps[currentStepIndex].name}</span>
    </div>
  );
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <StepCounter />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {children}
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <BookingSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BookingProvider>
  );
}