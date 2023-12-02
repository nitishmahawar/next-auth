import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Required!" })
    .min(4, { message: "Name must contain 4 characters" }),
  email: z
    .string({ required_error: "Required!" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Required!" })
    .min(8, { message: "Password must be 8 character long" })
    .max(20),
});
