// app/components/GenerateLogo.tsx
"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../context/UserDetailContext";
import axios from "axios";
import {
  DownloadIcon,
  LayoutDashboard,
  Loader2Icon,
  LoaderIcon,
} from "lucide-react";
import lookup from "../data/lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MorphingDialogBasicImage } from "@/components/motion-primitives/MorphingDialogBasicImage";

interface IDesign {
  image: string;
  prompt: string;
  title: string;
}

interface IFormData {
  title: string;
  desc: string;
  idea: string;
  palette: string;
  design: IDesign;
}

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState<IFormData>();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  const GenerateAILogo = async () => {
    if (!formData) return;

    setLoading(true);

    const basePrompt = `Generate a text prompt to create a single, detailed logo design for the brand name: ${formData.title}, with the following description: ${formData.desc}. Use a color combination of ${formData.palette}. Integrate the core idea: ${formData.idea}, and apply the design inspiration: ${formData.design?.title}. This should result in one single, centered logo on a clean background, with no collage or multiple images. Referring to this Logo Prompt: ${formData.design?.prompt}. Ensure only one logo is generated, no split frames, no image grids, clean minimal or gradient background, and no extra UI elements or text overlays. Return result as JSON with only one field: prompt.`;

    try {
      // Step 1: Ask Gemini for a clean prompt via your new API
      const geminiResponse = await axios.post("/api/ai-logo-prompt", {
        prompt: basePrompt,
      });

      const finalPrompt =
        geminiResponse.data.prompt +
        "Do not include any human figures, girls, faces, characters, or people. Focus entirely on graphic elements, symbols, text, and abstract or object-based design only.";

      // Step 2: Send that prompt to your image model API
      const result = await axios.post("/api/ai-logo-model", {
        prompt: finalPrompt,
        title: formData.title,
        desc: formData.desc,
        email: userDetail?.email,
      });

      if (result.data.success && result.data.imageUrl) {
        setLogoImage(result.data.imageUrl);
      } else {
        console.error("Image generation failed:", result.data.error);
      }
    } catch (error) {
      console.error("Logo generation error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("formData loaded:", formData);
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const onDownload = () => {
    const imageWindow = window.open();
    imageWindow?.document.write(
      `<img src="${logoImage}" alt="Base-64 Image" />`
    );
  };
  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <h2>{lookup.LoadingWaitTitle}</h2>
      {loading && (
        <div className="flex flex-col items-center mt-2">
          <p className="text-xl text-gray-500 text-center">
            {lookup.LoadingWaitDesc}
          </p>
          <LoaderIcon className="animate-spin" />
          <h2 className="mt-2 font-medium text-2xl text-gray-500">
            Do Not Refresh this Page
          </h2>
        </div>
      )}

      {logoImage && (
        <div className="mt-5">
          <MorphingDialogBasicImage
            imageUrl={logoImage}
            alt="Generated logo"
            width={300}
            height={300}
          />

          <div className="mt-4 flex items-center gap-5 ">
            {/* <Button onClick={() => onDownload()}>
              <DownloadIcon /> Download
            </Button> */}

            <a
              href={`${logoImage.replace(
                /\/upload\//,
                "/upload/fl_attachment/"
              )}`}
              download={formData?.title || "image.jpg"}
            >
              <Button className="w-full">Download</Button>
            </a>

            <Link href={"/dashboard"}>
              <Button variant={"outline"}>
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateLogo;
