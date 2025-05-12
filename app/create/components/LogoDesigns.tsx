import React, { useState } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";
import LogoDesign from "@/app/data/LogoDesign";
import Image from "next/image";

function LogoDesigns({
  handleInputChange,
  formData,
}: {
  handleInputChange: ({
    title,
    image,
    prompt,
  }: {
    title: string;
    image: string;
    prompt: string;
  }) => void;
  formData: any;
}) {
  const [selectedOption, setSelectedOption] = useState<{
    title: string;
    image: string;
    prompt: string;
  }>(formData?.design);
  return (
    <div className="mt-10">
      <HeadingDecription
        title={lookup.LogoDesignTitle}
        description={lookup.LogoDesignDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {LogoDesign.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design);
              handleInputChange(design);
            }}
            className={` p-1 cursor-pointer  hover:border-2 border-primary rounded-xl ${
              selectedOption === design && "border-2 rounded-xl border-primary"
            }`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
              className="w-full rounded-xl h-[150px] object-cover"
            />
            <h2 className="font-semibold text-center text-xl">
              {design.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
