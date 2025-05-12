"use client";
import React, { useEffect, useState } from "react";
import HeadingDecription from "./HeadingDecription";
import lookup from "@/app/data/lookup";
import Prompt from "@/app/data/Prompt";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
interface LogoIdea {
  idea: string;
  description?: string;
}
function LogoIdeas({
  handleInputChange,
  formData,
}: {
  handleInputChange: (val: string) => void;
  formData: any;
}) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<LogoIdea[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>(formData?.idea);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    try {
      const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        formData?.design?.title || ""
      )
        .replace("{logoTitle}", formData?.title || "")
        .replace("{logoDesc}", formData?.desc || "")
        .replace("{logoPrompt}", formData?.design?.prompt || "");

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      // console.log("Raw API response:", result.data);

         const logoIdeasArray: LogoIdea[] = result.data; 
       if (logoIdeasArray && Array.isArray(logoIdeasArray)) {
         // Ensure each item has the 'idea' property
         const formattedIdeas = logoIdeasArray
           .map((item) => ({
             idea: item.idea || "No idea provided",
             // description: item.description // if you add descriptions later
           }))
           .filter((item) => item.idea !== "No idea provided"); // Optionally filter out malformed items

         setIdeas(formattedIdeas);
        //  console.log("Formatted ideas:", formattedIdeas);
       } else {
         setIdeas(null);
         console.warn(
           "API response was not an array or was empty:",logoIdeasArray
         );
       }
    } catch (error) {
      console.error("Error generating logo ideas:", error);
      setIdeas(null);
    } finally {
      setLoading(false);
    }
  };

  // console.log("ideas", ideas);

  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  // console.log("ideas", ideas);
  return (
    <div className="my-10">
      <HeadingDecription
        title={lookup.LogoIdeaTitle}
        description={lookup.LogoIdeaDesc}
      />
      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas.map((item, index) => (
            <h2
              onClick={() => {
                setSelectedOption(item.idea);
                handleInputChange(item.idea);
              }}
              key={index}
              className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
                selectedOption === item.idea && "border-primary"
              }`}
            >
              {item.idea}
            </h2>
          ))}
        <h2
          onClick={() => {
            setSelectedOption("Let AI Select the best Idea");
            handleInputChange("Let AI Select the best Idea");
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
            selectedOption === "Let AI Select the best Idea" && "border-primary"
          }`}
        >
          Let AI Select the best Idea
        </h2>
      </div>
    </div>
  );
}

export default LogoIdeas;
