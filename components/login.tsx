"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
const LoginComp = () => {
  return (
    <div className="w-full flex-grow flex items-center justify-center">
      <Button variant="outline" onClick={() => signIn("google")}>
        <Image src="/google-icon.png" alt="logo" width={25} height={25} />
        <span className="ml-2 font-semibold">Sign in with Google</span>
      </Button>
    </div>
  );
};

export default LoginComp;
