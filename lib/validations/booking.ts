import * as z from "zod";

export const bookingFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\d+$/, "Phone number can only contain digits"),
  eventType: z.string().min(1, "Please select an event type"),
  attendees: z.number().min(1, "Number of attendees is required").max(500, "Maximum 500 attendees"),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;