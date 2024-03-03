"use client";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const passwordValidation = z
  .string()
  .min(8, { message: "Password should be at least 8 characters long" })
  .max(16, { message: "Password should not exceed 16 characters" })
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/,
    {
      message:
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character",
    }
  );

const formSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: FC<ResetPasswordProps> = ({ token }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (password: string) => {
      const data = await axios.post("/api/user/reset-password", {
        password,
        token,
      });
      return data;
    },
    onSuccess(data, variables, context) {
      toast.success("Password reset successfully");
      form.reset();
      router.push("/login");
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data ?? "Something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values.password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Type in a new secure password and press save to update your password
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isPending}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isPending}
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-4" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Save New Password"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account ?{" "}
          <Link className="text-primary font-medium" href="/login">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
