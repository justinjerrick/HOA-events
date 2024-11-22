"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, Users, Utensils } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Available for full-day bookings",
  },
  {
    icon: Users,
    title: "Spacious Venue",
    description: "Accommodates large gatherings",
  },
  {
    icon: Utensils,
    title: "Amenities",
    description: "Full kitchen and modern facilities",
  },
];

export function SpaceSelection() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Select Your Space</h1>
        <p className="text-gray-600 mt-2">
          Choose our premium event space for your next occasion
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="aspect-[16/9] w-full relative">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
            alt="Event Space"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold">The Grand Hall</h2>
          <p className="text-gray-600 mt-2">
            Our signature space perfect for any event type. Features high ceilings,
            natural lighting, and modern amenities.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-3">
                <feature.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold">$2,000</p>
              <p className="text-sm text-gray-600">per day</p>
            </div>
            <Button 
              onClick={() => router.push("/book/date")}
              className="w-full sm:w-auto"
            >
              Select Space
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}