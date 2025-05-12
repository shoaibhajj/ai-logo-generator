// app/api/ai-logo-prompt/route.ts
import { NextResponse } from "next/server";
import { AiLogoPrompt } from "@/configs/AiModel";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const geminiResponse = await AiLogoPrompt(prompt);
    const parsed = JSON.parse(geminiResponse);

    return NextResponse.json({ success: true, prompt: parsed.prompt });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Prompt generation failed" },
      { status: 500 }
    );
  }
}
