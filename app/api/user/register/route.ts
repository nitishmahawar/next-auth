import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/register";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { mailer } from "@/lib/mailer";

function generateOTP(): string {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { email, name, password } = registerSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return new NextResponse("User already exists with this email!", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    const now = new Date();

    const verification = await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: crypto.randomUUID(),
        expires: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const confirmationMail = await mailer.sendMail({
      to: email, // Change to your recipient
      from: "nitish.mahawar@apttechsols.com", // Change to your verified sender
      subject: "Confirm Your Email",
      text: `Please confirm your email`,
      html: `<div>
      <h2>Please click on verification link below</h2>
      <a href="http://localhost:3000/verify-email?token=${verification.token}" >
      Confirm Email</a>
      </div>`,
    });

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log("[REGESTER_ERROR]", error);
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse("Internal Error!", { status: 500 });
  }
};
