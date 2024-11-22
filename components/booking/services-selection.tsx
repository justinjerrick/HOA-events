"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/context/booking-context";
import { Music2, UtensilsCrossed, Camera, Users2, Mic2, Palette } from "lucide-react";
import type { Service } from "@/lib/types/booking";

const availableServices: Service[] = [
  {
    id: "catering",
    name: "Professional Catering",
    price: 1500,
    icon: UtensilsCrossed,
    description: "Full-service catering for your event",
  },
  {
    id: "photography",
    name: "Photography",
    price: 800,
    icon: Camera,
    description: "Professional event photography",
  },
  {
    id: "dj",
    name: "DJ Services",
    price: 600,
    icon: Music2,
    description: "Professional DJ and sound equipment",
  },
  {
    id: "staffing",
    name: "Event Staff",
    price: 400,
    icon: Users2,
    description: "Professional event staff and coordinators",
  },
  {
    id: "av",
    name: "AV Equipment",
    price: 500,
    icon: Mic2,
    description: "Professional audio/visual equipment",
  },
  {
    id: "decor",
    name: "Event Decoration",
    price: 700,
    icon: Palette,
    description: "Custom event decoration and setup",
  },
];

export function ServicesSelection() {
  const router = useRouter();
  const { state, addService, removeService } = useBooking();
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(state.services.map(service => service.id))
  );

  useEffect(() => {
    if (!state.dateRange?.from || !state.dateRange?.to) {
      router.push("/book/date");
    }
  }, [state.dateRange, router]);

  if (!state.dateRange?.from || !state.dateRange?.to) {
    return null;
  }

  const handleServiceToggle = (service: Service) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(service.id)) {
      newSelected.delete(service.id);
      removeService(service.id);
    } else {
      newSelected.add(service.id);
      addService(service);
    }
    setSelectedServices(newSelected);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Additional Services</h1>
        <p className="text-gray-600 mt-2">
          Enhance your event with our premium services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableServices.map((service) => {
          const isSelected = selectedServices.has(service.id);
          const ServiceIcon = service.icon;

          return (
            <Card
              key={service.id}
              className={`p-6 cursor-pointer transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleServiceToggle(service)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  isSelected ? "bg-primary/10" : "bg-muted"
                }`}>
                  <ServiceIcon className={`h-6 w-6 ${
                    isSelected ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    ${service.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedServices.size > 0 && (
        <Card className="mt-6 p-4">
          <h3 className="font-medium mb-2">Selected Services</h3>
          <div className="space-y-2">
            {Array.from(selectedServices).map((id) => {
              const service = availableServices.find((s) => s.id === id);
              if (!service) return null;
              return (
                <div key={id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-medium">
                    ${service.price.toLocaleString()}
                  </span>
                </div>
              );
            })}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total Additional Services</span>
              <span>
                ${Array.from(selectedServices)
                  .reduce((sum, id) => {
                    const service = availableServices.find((s) => s.id === id);
                    return sum + (service?.price || 0);
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/book/date")}
        >
          Back
        </Button>
        <Button
          onClick={() => router.push("/book/details")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}