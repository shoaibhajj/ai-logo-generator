"use client";
import React, { useEffect, useState } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";

function LogoTitle({
  handleInputChange,
}: {
  handleInputChange: (val: string) => void;
}) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    // Get search params on client side only
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const titleParam = params.get("title") ?? "";
      setTitle(titleParam);
    }
  }, []);
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
