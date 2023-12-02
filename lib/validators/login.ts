import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Required!" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Required!" })
    .min(8, { message: "Password must be 8 character long" })
    .max(20),
});
