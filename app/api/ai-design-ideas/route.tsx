import { generateDesignIdeas } from "@/configs/AiModel";
import { NextResponse } from "next/server";

// Helper function to extract JSON from a string (still good to have)
function extractJsonFromString(text: string): string | null {
  // Trim whitespace first, as JSON mode should give clean JSON
  const trimmedText = text.trim();

  // Check if it looks like a JSON array or object
  if (
    (trimmedText.startsWith("[") && trimmedText.endsWith("]")) ||
    (trimmedText.startsWith("{") && trimmedText.endsWith("}"))
  ) {
    try {
      JSON.parse(trimmedText); // Validate it
      return trimmedText;
    } catch (e) {
      // It looked like JSON but wasn't valid
    }
  }

  // Fallback for markdown wrapped JSON (less likely with JSON mode but safe)
  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = trimmedText.match(jsonRegex);
  if (match && match[1]) {
    try {
      JSON.parse(match[1]); // Validate extracted
      return match[1];
    } catch (e) {
      // Markdown content wasn't valid JSON
    }
  }
  return null;
}

// Define the expected structure for type safety
interface LogoIdeaFromAI {
  idea: string; // This should match the key you instruct the AI to use
  // description?: string; // Add if you plan to ask for descriptions too
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const rawResult = await generateDesignIdeas(prompt);
    // console.log(
    //   "Raw result from generateDesignIdeas (expected JSON array string):",
    //   rawResult
    // );

    const jsonString = extractJsonFromString(rawResult);

    if (!jsonString) {
      console.error(
        "Failed to extract or validate JSON array from model response:",
        rawResult
      );
      return NextResponse.json(
        {
          error: "Failed to parse valid JSON array from AI response",
          rawResponse: rawResult,
        },
        { status: 500 }
      );
    }

    // console.log("Extracted JSON string (should be an array):", jsonString);

    try {
      // Parse into your defined TypeScript interface (expecting an array)
      const parsedResult: LogoIdeaFromAI[] = JSON.parse(jsonString);

      // Validate if it's an array
      if (!Array.isArray(parsedResult)) {
        console.error("Parsed result is not an array:", parsedResult);
        return NextResponse.json(
          {
            error: "AI response was not a JSON array as expected",
            rawResponse: rawResult,
            parsed: parsedResult,
          },
          { status: 500 }
        );
      }

      // Optional: Validate each item in the array (good for robustness)
      for (const item of parsedResult) {
        if (typeof item.idea !== "string") {
          console.error(
            "Invalid item structure in the array. 'idea' key is missing or not a string.",
            item
          );
          return NextResponse.json(
            {
              error: "AI response array contains invalid items",
              rawResponse: rawResult,
              parsed: parsedResult,
            },
            { status: 500 }
          );
        }
      }

      // If everything is fine, return the parsed array directly
      return NextResponse.json(parsedResult);
    } catch (parseError) {
      console.error(
        "Error parsing extracted JSON string into an array:",
        parseError,
        "String was:",
        jsonString
      );
      return NextResponse.json(
        {
          error: "Failed to parse the extracted JSON content into an array",
          rawResponse: rawResult,
          extractedJson: jsonString,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in API POST /api/ai-design-ideas:", error);
    const errorMessage = error.message || "Failed to generate design ideas";
    const errorDetails =
      error.error?.message || (error.cause ? String(error.cause) : undefined);

    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}
