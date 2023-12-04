import { redirect } from "next/navigation";
import React from "react";
import Verify from "./verify";

const Page = ({
  searchParams: { token },
}: {
  searchParams: { token: string | null };
}) => {
  if (!token) {
    return redirect("/login");
  }
  return <Verify token={token} />;
};

export default Page;
