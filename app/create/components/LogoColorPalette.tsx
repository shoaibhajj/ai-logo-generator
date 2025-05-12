import React, { useState } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";
import Colors from "@/app/data/Colors";

function LogoColorPalette({
  handleInputChange,
  formData,
}: {
  handleInputChange: (val: string) => void;
  formData: any;
}) {
  const [selectedOption, setSelectedOption] = useState<string>(
    formData?.palette
  );
  return (
    <div className="mt-10">
      <HeadingDecription
        title={lookup.LogoColorPaletteTitle}
        description={lookup.LogoColorPaletteDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((palette, index) => (
          <div
            key={index}
            className={`flex p-1  cursor-pointer ${
              selectedOption === palette.name &&
              "border-2 rounded-lg  border-primary "
            } `}
          >
            {palette.colors.map((color, index) => (
              <div
                key={index}
                className="h-24 w-full    "
                onClick={() => {
                  setSelectedOption(palette.name);
                  handleInputChange(palette.name);
                }}
                style={{
                  backgroundColor: color,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPalette;
