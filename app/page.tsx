"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div>
      <h1 className="text-2xl font-bold py-6 px-4 space-y-6">Protected Page</h1>
      {JSON.stringify(user, undefined, 2)}
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Page;
