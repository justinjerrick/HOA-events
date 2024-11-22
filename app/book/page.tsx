"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/book/space");
  }, [router]);
  
  return null;
}