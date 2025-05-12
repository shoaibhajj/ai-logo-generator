import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not defined in environment variables.");
  throw new Error(
    "GEMINI_API_KEY is not defined in environment variables. The AI service cannot be initialized."
  );
}

const ai = new GoogleGenAI({ apiKey: apiKey });

const modelName = "gemini-1.5-flash-latest";

const generationConfig = {
  response_mime_type: "application/json",
  temperature: 0.3,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// console.log("Using model:", modelName);

export const generateDesignIdeas = async (userProvidedPrompt: string) => {
  // console.log("User-provided prompt received:", userProvidedPrompt);

  // --- Define the EXACT JSON structure we want: A ROOT-LEVEL ARRAY ---
  const desiredJsonStructureExample = [
    { idea: "Animated pilot character with a friendly smile." },
    { idea: "Stylized bird mascot in flight attendant uniform." },
    { idea: "Sleek aircraft silhouette with dynamic speed lines." },
    { idea: "Playful cloud character holding a boarding pass." },
  ];

  const contents = [
    // --- Few-shot Example ---
    {
      role: "user",
      parts: [
        {
          text: `Generate 4 logo design ideas for a new gaming company "PixelPlay".
The ideas should be fun and modern.
Please provide the output strictly as a JSON array.
Each element in the array must be an object.
Each object must have a single key named "idea",
where the value is a string containing the logo idea (4-7 words).`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          // The model's response for the example above.
          // It MUST be a string representation of the exact JSON structure (root array).
          text: JSON.stringify([
            { idea: "Pixelated joy-stick controller." },
            { idea: "Smiling retro game character." },
            { idea: "Dynamic 'P' forming a game screen." },
            { idea: "Abstract geometric game world." },
          ]),
        },
      ],
    },
    // --- Actual User Request ---
    {
      role: "user",
      parts: [
        {
          text: `Based on the following request, generate 4 to 5 distinct design suggestions.
User request: "${userProvidedPrompt}"

IMPORTANT: You MUST provide the response strictly as a JSON array.
The entire response MUST be a single, valid JSON array, starting with '[' and ending with ']'.
Do NOT include any text before or after the JSON array. Do NOT use markdown backticks (\`\`\`).

Each element in the array must be an object.
Each object must have a single key: "idea".
The value of "idea" must be a string containing a concise logo idea (around 4-7 words each).

Here is an example of the exact JSON array structure required:
${JSON.stringify(desiredJsonStructureExample, null, 2)}
`,
        },
      ],
    },
  ];

  const requestConfig = {
    generationConfig: generationConfig,
    safetySettings: safetySettings,
  };

  try {
    const streamResponse = await ai.models.generateContentStream({
      model: modelName,
      contents: contents,
      config: requestConfig,
    });

    let fullResponseText = "";
    for await (const chunk of streamResponse) {
      if (chunk && chunk.text && typeof chunk.text === "string") {
        fullResponseText += chunk.text;
      }
    }
    // console.log(
    //   "Raw model response (expecting JSON array string):",
    //   fullResponseText
    // );
    return fullResponseText;
  } catch (error) {
    console.error("Error in ai.models.generateContentStream call:", error);
    // @ts-ignore
    if (error && error.message) {
      console.error("Error message:", error);
    }
    throw error;
  }
};
export const AiLogoPrompt = async (
  userInstructionForPromptGeneration: string
) => {
  console.log(
    "User instruction for prompt generation:",
    userInstructionForPromptGeneration
  );

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${userInstructionForPromptGeneration}

          IMPORTANT INSTRUCTIONS FOR THE AI MODEL:
          1. Your entire response MUST be a single, valid JSON object.
          2. The JSON object MUST have one root-level key: "prompt".
          3. The value of the "prompt" key MUST be a string containing the generated logo text prompt.
          4. Do NOT include any text, explanations, or markdown backticks (\`\`\`) before or after the JSON object.
          5. STRICTLY ADHERE to this JSON format.

          Example of the exact desired output format:
          {"prompt": "A creative and detailed logo prompt text will be here."}
          `,
        },
      ],
    },
  ];
  const requestConfig = {
    generationConfig: generationConfig,
    safetySettings: safetySettings,
  };

  try {
    const streamResponse = await ai.models.generateContentStream({
      model: modelName,
      contents: contents,
      config: requestConfig,
    });

    let fullResponseText = "";
    for await (const chunk of streamResponse) {
      if (chunk && chunk.text && typeof chunk.text === "string") {
        fullResponseText += chunk.text;
      }
    }
    console.log(
      "Raw model response (expecting JSON array string):",
      fullResponseText
    );
    return fullResponseText;
  } catch (error) {
    console.error("Error in ai.models.generateContentStream call:", error);
    // @ts-ignore
    if (error && error.message) {
      console.error("Error message:", error);
    }
    throw error;
  }
};
