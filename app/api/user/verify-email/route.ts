import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse("Verification token is required", {
        status: 400,
      });
    }

    const verification = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!verification) {
      return new NextResponse("Invalid verification link", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: verification.identifier },
    });

    if (!user) {
      return new NextResponse("User not found!", { status: 400 });
    }

    if (user.emailVerified) {
      return new NextResponse("Email already verified!", { status: 400 });
    }

    await prisma.user.update({
      where: { email: verification.identifier },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return new NextResponse("Email Verified. Please login to your account");
  } catch (error) {
    console.log("VERIFY_EMAIL", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
