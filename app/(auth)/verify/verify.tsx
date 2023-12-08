"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "sonner";

interface VerifyProps {
  token: string;
}

const Verify: FC<VerifyProps> = ({ token }) => {
  const router = useRouter();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["verify", token],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/verify-email?token=${token}`);
      return data;
    },
  });

  if (isError) {
    // @ts-ignore
    toast.error(error?.response?.data ?? "Something went wrong");
    router.push("/login");
    return;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <Loader2 size={30} className="animate-spin" />
        <p className="text-muted-foreground">Verifying...</p>
      </div>
    );
  }

  if (data) {
    toast.success("Email Verified");
    router.push("/login");
    return;
  }

  return null;
};

export default Verify;
