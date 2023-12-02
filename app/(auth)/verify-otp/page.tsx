"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OtpInput from "react-otp-input";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  if (!email) {
    router.push("/register");
  }

  const [otp, setOtp] = useState("");
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <div className="flex gap-2 items-center px-3 py-1.5 rounded-md border w-fit bg-accent/80">
          {email}{" "}
          <Link href={"/register"}>
            <Edit size={16} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="font-medium">Verification Code</p>
          <p className="text-sm text-muted-foreground">
            Enter the verification code sent to your email address
          </p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          containerStyle={{
            display: "flex",
            width: "100%",
            gap: "0.5rem",
            marginLeft: "4px",
          }}
          renderSeparator={<span className="shrink-0"></span>}
          renderInput={(props) => (
            <input
              {...props}
              className={cn(
                "border-b-2 text-xl outline-none remove-arrow focus-within:border-primary",
                props.value && "border-primary"
              )}
            />
          )}
          inputStyle={{
            height: "2rem",
            width: "2rem",
            textAlign: "center",
          }}
        />
        <button className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors">
          Didn't receive a code? Resend
        </button>
        <Button className="ml-auto flex">Verify Email</Button>
      </CardContent>
    </Card>
  );
};

export default Page;
