"use client";   
import React, { useState } from "react";
import lookup from "../data/lookup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

function Hero() {
    const { user } = useUser();
  const [logoTitle, setLogoTitle] = useState("");
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-24  gap-5 ">
      <h2 className="text-primary text-5xl text-center font-bold">
        {lookup.HeroHeading}
      </h2>
      <h2 className=" text-5xl text-center font-bold">
        {lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-500 text-center ">{lookup.HeroDesc}</p>

      <div className="flex  gap-6 flex-col md:flex-row  w-full  max-w-2xl mt-10">
        <input
          placeholder={lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => {
            setLogoTitle(e.target.value);
          }}
        />
        {user ? (
          <Link href={`/create?title=${logoTitle}`}>
            <Button className="w-full p-6">Get Started</Button>
          </Link>
        ) : (
          <SignInButton forceRedirectUrl={`/`}>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Hero;
