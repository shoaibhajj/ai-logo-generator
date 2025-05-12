"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

function Header() {
  const { user } = useUser();
   const pathname = usePathname(); 

 
  return (
    <div className="px-2 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center gap-5 md:gap-0 shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={180} height={100} />
      <div className="flex items-center justify-center gap-2 md:gap-5">
        {user ? (
          <Link href={"/dashboard"} hidden={pathname === "/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <SignInButton forceRedirectUrl={`/`}>
            <Button>Get Started</Button>
          </SignInButton>
        )}

        <UserButton />
      </div>
    </div>
  );
}

export default Header;
