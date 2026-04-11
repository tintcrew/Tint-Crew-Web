import { z } from "zod";

export const bookingSchema = z.object({
  year: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  packageId: z.string().min(1),
  packageName: z.string().min(1),
  price: z.number().positive(),
  services: z.array(z.string()),
  addons: z.array(z.string()).optional().default([]),
  totalPrice: z.number().positive(),
  appointmentType: z.enum(["pick_a_time", "drop_and_go"]),
  appointmentDate: z.string().min(1),
  appointmentTime: z.string().min(1),
  customerName: z.string().min(1, "Name is required"),
  customerPhone: z.string().min(7, "Valid phone number required"),
  customerEmail: z.string().email("Valid email required"),
  notes: z.string().optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional().default(""),
  message: z.string().min(1, "Message is required"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
