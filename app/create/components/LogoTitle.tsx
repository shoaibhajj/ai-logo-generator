"use client";
import React, { useState } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({
  handleInputChange,
}: {
  handleInputChange: (val: string) => void;
}) {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState(searchParam?.get("title") ?? "");

  return (
    <div className="my-10">
      <HeadingDecription
        title={lookup.LogoTitle}
        description={lookup.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder={lookup.InputTitlePlaceholder}
        className="!p-4 border rounded-lg mt-5 w-full"
        defaultValue={title}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoTitle;
