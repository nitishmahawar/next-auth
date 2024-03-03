"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { loginSchema } from "@/lib/validators/login";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const [isGithubClicked, setIsGithubClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || isGoogleClicked || isGithubClicked;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    setIsLoading(false);
    if (!res?.ok) {
      toast.error(res?.error);
    }
    router.refresh();
  };

  useEffect(() => {
    setIsGithubClicked(false);
    setIsGoogleClicked(false);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="space-y-1 mt-4">
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className=" text-xs capitalize text-muted-foreground hover:text-primary/90 transition-colors font-medium"
                      href="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute top-2.5 right-2.5 text-muted-foreground"
                      onClick={() => setIsPasswordVisible((ipv) => !ipv)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff strokeWidth={1.5} size={20} />
                      ) : (
                        <Eye strokeWidth={1.5} size={20} />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6" type="submit" disabled={isDisabled}>
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-4 py-4 items-center">
          <Separator className="flex-1" />
          <p className="uppercase text-xs text-muted-foreground font-medium">
            or continue with
          </p>

          <Separator className="flex-1" />
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1"
            variant="outline"
            disabled={isDisabled}
            onClick={() => {
              setIsGoogleClicked(true);
              signIn("google");
            }}
          >
            {isGoogleClicked ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Image
                height={20}
                width={20}
                src="/google.svg"
                className="h-4 w-4 mr-2"
                alt="logo"
              />
            )}
            Google
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            disabled={isDisabled}
            onClick={() => {
              setIsGithubClicked(true);
              signIn("github");
            }}
          >
            {isGithubClicked ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Github size={16} className="mr-2" />
            )}
            Github
          </Button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 pt-4">
          Don&apos;t have an account ?{" "}
          <Link className="text-primary font-medium" href="/register">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignIn;
