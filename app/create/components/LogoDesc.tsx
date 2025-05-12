import React from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";

function LogoDesc({
  handleInputChange,
  formData,
}: {
  handleInputChange: (val: string) => void;
  formData: any;
}) {
  return (
    <div className="mt-10">
      <HeadingDecription
        title={lookup.LogoDescTitle}
        description={lookup.LogoDescDesc}
      />
      <input
        type="text"
        placeholder={"Syrian Resturant serve..."}
        value={formData?.desc}
        className="!p-4 border rounded-lg mt-5 w-full"
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
