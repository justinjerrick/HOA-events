"use client";

import { createContext, useContext, useState } from "react";
import type { BookingState, BookingContextType, Service, BookingDetails, DateRange } from "@/lib/types/booking";

const initialState: BookingState = {
  dateRange: undefined,
  services: [],
  details: undefined,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setDateRange = (dateRange: DateRange) => {
    setState((prev) => ({ ...prev, dateRange }));
  };

  const addService = (service: Service) => {
    setState((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
  };

  const removeService = (serviceId: string) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== serviceId),
    }));
  };

  const setDetails = (details: BookingDetails) => {
    setState((prev) => ({ ...prev, details }));
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        setDateRange,
        addService,
        removeService,
        setDetails,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}