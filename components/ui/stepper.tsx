"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

interface Step {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("px-4", className)}>
      <ol role="list" className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "relative",
              index !== steps.length - 1 ? "pr-6 sm:pr-12 flex-auto" : "flex-none"
            )}
          >
            <div className="flex items-center">
              <Link
                href={step.href}
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                  index < currentStep && "hover:bg-primary/90"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <span className="sr-only">{step.title}</span>
              </Link>

              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute inset-0 -z-10 h-0.5 w-full",
                    "top-4 left-0",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm font-medium",
                "mt-2 sm:mt-3",
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}