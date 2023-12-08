import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name should be at least 4 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(16, { message: "Password should not exceed 16 characters" })
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/.test(
          value
        ),
      {
        message:
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
      }
    ),
});
