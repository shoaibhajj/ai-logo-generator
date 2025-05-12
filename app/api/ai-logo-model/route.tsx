import { db } from "@/configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const { prompt, email, title, desc } = await req.json();

  try {
    const aiGirlResponse = await fetch("https://ai-girl.site/api/workerai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!aiGirlResponse.ok) {
      const text = await aiGirlResponse.text();
      throw new Error(`AI-Girl error ${aiGirlResponse.status}: ${text}`);
    }

    const contentType = aiGirlResponse.headers.get("content-type") || "";

    if (!contentType.startsWith("image/")) {
      const text = await aiGirlResponse.text();
      throw new Error(`Unexpected content-type: ${contentType}\nBody: ${text}`);
    }

    // Convert image to base64
    const imageBuffer = await aiGirlResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64Image}`;

    // ✅ Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUrl, {
      folder: `logos/${email}`,
      public_id: `logo_${Date.now()}`,
    });

    const imageUrl = uploadResult.secure_url;

    // ✅ Save metadata to Firestore
  
    await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
      imageUrl,
      title,
      desc,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error: any) {
    console.error(
      "❌ Image generation or upload failed:",
      error.message || error
    );
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
