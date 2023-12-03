import React from "react";
import ResetPassword from "./reset-password";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reset Password",
};

const Page = ({
  searchParams: { token },
}: {
  searchParams: { token: string | null };
}) => {
  if (!token) {
    return redirect("/login");
  }
  return <ResetPassword token={token} />;
};

export default Page;
