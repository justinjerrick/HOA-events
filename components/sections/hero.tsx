import { ArrowRight, CalendarRange, Music, Utensils, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: CalendarRange,
    title: "Flexible Booking",
    description: "Book up to 2 weeks in advance with daily availability",
  },
  {
    icon: Users,
    title: "Versatile Space",
    description: "Perfect for any event type and group size",
  },
  {
    icon: Utensils,
    title: "Catering Options",
    description: "Optional professional catering services available",
  },
  {
    icon: Music,
    title: "Entertainment",
    description: "Professional DJ and entertainment services",
  },
];

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            House of Arts Events
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your premier destination for unforgettable events. Our versatile space adapts to your vision, 
            whether it's a corporate gathering, wedding celebration, or artistic showcase.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/book/space">
              <Button size="lg">
                Start Booking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-200 pt-10">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <div className="flex items-center gap-x-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Event space preview"
              className="w-[76rem] rounded-md bg-gray-50 object-cover"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}