"use client";
import { useSession } from "next-auth/react";
import UserAvatar from "@/components/user-avatar";
import { ModeToggle } from "./theme-toggle";
import { Typing } from "./typing";
import Image from "next/image";
import MobileSidebar from "@/components/mobile-sidebar";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="w-full h-16 fixed flex justify-between items-center px-2  bg-primary/10 backdrop-blur-lg z-50">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <Image
          src="/brain.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded hidden md:block"
        />
        <Link href="/">
          <Typing />
        </Link>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
};

export default Navbar;
