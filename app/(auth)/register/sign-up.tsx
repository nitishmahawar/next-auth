"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
} from "../../../components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { registerSchema } from "@/lib/validators/register";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Loader from "../../../components/spinner";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutate: register, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof registerSchema>) => {
      const { data } = await axios.post("/api/user/register", values);
      return data;
    },
    onSuccess(data, variables, context) {
      toast.success("A verification link is sent to your email");
      form.reset();
    },
    onError(error: any, variables, context) {
      toast.error(error?.response?.data ?? "Something went wrong!");
    },
  });

  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const [isGithubClicked, setIsGithubClicked] = useState(false);
  const isDisabled = isPending || isGoogleClicked || isGithubClicked;

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register(values);
  };

  useEffect(() => {
    setIsGithubClicked(true);
    setIsGoogleClicked(false);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Enter your details below to create new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="space-y-1 mt-4">
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
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="space-y-1 mt-4">
                  <FormLabel>Password</FormLabel>

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
              {isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Create New Account"
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
          Already have an account ?{" "}
          <Link className="text-primary font-medium" href="/login">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUp;
