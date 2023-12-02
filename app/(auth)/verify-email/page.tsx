"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["verify email", token],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/verify-email?token=${token}`);

      if (error) {
        toast.error(error.message ?? "Something went wrong");
      }
      // toast.success(data);
      return data;
    },
    enabled: !!token,
  });

  if (!token) router.push("/login");

  return (
    <div className="flex min-h-screen items-center justify-center">
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{data}</CardTitle>
            <CardDescription>Please login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
