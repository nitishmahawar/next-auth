import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { token, password } = await req.json();

    if (!token) {
      return new NextResponse("Verification token in required", {
        status: 400,
      });
    }

    if (!password) {
      return new NextResponse("Password is required!", { status: 400 });
    }

    const resetToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return new NextResponse("Invalid verification link", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email: resetToken.identifier },
      data: { hashedPassword },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return new NextResponse("Password updated", { status: 200 });
  } catch (error) {
    console.log("RESET_PASSWORD_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
