"use client";

import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking-context";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";

export default function ConfirmationPage() {
  const router = useRouter();
  const { state } = useBooking();

  if (!state.dateRange?.from || !state.dateRange?.to || !state.details) {
    router.push("/book/details");
    return null;
  }

  return <BookingConfirmation />;
}