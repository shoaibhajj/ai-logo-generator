"use client";
import React, { useEffect, useState } from "react";
import LogoTitle from "./components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./components/LogoDesc";
import LogoColorPalette from "./components/LogoColorPalette";
import LogoDesigns from "./components/LogoDesigns";
import LogoIdeas from "./components/LogoIdeas";
import PricingModel from "./components/PricingModel";
import { toast } from "sonner";

function CreateLogo() {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<{
    title?: string;
    desc?: string;
    palette?: string;
    design?: string;
    idea?: string;
    pricing?: string;
  }>({
    title,
  });
  useEffect(() => {
    
    // Get search params on client side only
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const titleParam = params.get("title") ?? "";
      setTitle(titleParam);
      setFormData((prev) => ({ ...prev, title: titleParam }));
    }
  }, []);
  const handleInputChange = (
    field: string,
    value: string | { title: string; image: string; prompt: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return !!formData.title;
      case 2:
        return !!formData.desc;
      case 3:
        return !!formData.palette;
      case 4:
        return !!formData.design;
      case 5:
        return !!formData.idea;
      case 6:
        return !!formData.pricing;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNextStep()) {
      setStep((prev) => prev + 1);
    } else {
      // Optionally show error message
      // alert(`Please complete step ${step} before continuing`);
      toast(`Please complete step ${step} before continuing`);
    }
  };

  return (
    <div className="mt-15 md:mt-28 p-3 md:p-10 border rounded-xl 2xl:mx-72">
      {step === 1 && (
        <LogoTitle handleInputChange={(v) => handleInputChange("title", v)} />
      )}
      {step === 2 && (
        <LogoDesc
          handleInputChange={(v) => handleInputChange("desc", v)}
          formData={formData}
        />
      )}
      {step === 3 && (
        <LogoColorPalette
          handleInputChange={(v) => handleInputChange("palette", v)}
          formData={formData}
        />
      )}
      {step === 4 && (
        <LogoDesigns
          handleInputChange={(v) => handleInputChange("design", v)}
          formData={formData}
        />
      )}
      {step === 5 && (
        <LogoIdeas
          handleInputChange={(v) => handleInputChange("idea", v)}
          formData={formData}
        />
      )}
      {step === 6 && (
        <PricingModel
          handleInputChange={(v) => handleInputChange("pricing", v)}
          formData={formData}
        />
      )}

      <div className="flex w-full justify-between items-center mt-10">
        {step !== 1 && (
          <Button
            variant={"outline"}
            onClick={() => setStep((prev) => prev - 1)}
          >
            <ArrowLeft /> Previous
          </Button>
        )}
        <Button onClick={handleNextStep}>
          <ArrowRight /> Continue
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
