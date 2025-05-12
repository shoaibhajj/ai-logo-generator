"use client";
import React, { useEffect } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PricingModel({
  handleInputChange,
  formData,
}: {
  handleInputChange: (val: string) => void;
  formData: any;
}) {
  const { user } = useUser();

  useEffect(() => {
    // console.log("FormData changed:", formData);
    if (formData && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      // console.log("Saved to localStorage:", formData);
    }
  }, [formData]);

  // console.log("formData", formData);

  return (
    <div className="">
      <HeadingDecription
        title={lookup.LogoPricingModelTitle}
        description={lookup.LogoPricingModelDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {lookup.pricingOption.map((pricing, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center  p-5 border rounded-xl"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl ">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, index) => (
                <h2 key={index} className="text-lg mt-3">
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              pricing.title !== "Premium" ? (
                <Link href={`/generate-logo?type=${pricing.title}`}>
                  <Button className="mt-7">{pricing.button}</Button>
                </Link>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* Wrap the disabled button in a span to ensure hover works */}
                      <span className="inline-block">
                        <Button className="mt-7" disabled>
                          {pricing.button}
                        </Button>
                        <p className="mt-2 text-center font-semibold">
                          Coming Soon...
                        </p>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ) : pricing.title !== "Premium" ? (
              <SignInButton
                mode="modal"
                forceRedirectUrl={`/generate-logo?type=${pricing.title}`}
              >
                <Button className="mt-7">{pricing.button}</Button>
              </SignInButton>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* Wrap the disabled button in a span to ensure hover works */}
                    <span className="inline-block">
                      <Button className="mt-7" disabled>
                        {pricing.button}
                      </Button>

                      <p className="mt-2 text-center font-semibold">
                        Coming Soon...
                      </p>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
