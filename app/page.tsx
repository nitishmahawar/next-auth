"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Image from "next/image";

const Page = () => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Protected Page</h1>
      <div className="flex gap-2">
        {session.status === "loading" ? (
          <>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-[14px] w-24" />
              <Skeleton className="h-[12px] w-36" />
            </div>
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage src={(user?.image as string) ?? undefined} />
              <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </>
        )}
      </div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Page;
