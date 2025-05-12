import { db } from "@/configs/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userEmail, userName } = await req.json();

  if (!userEmail || !userName) {
    return NextResponse.json(
      { error: "userEmail and userName are required" },
      { status: 400 }
    );
  }

  try {
    // Check if user already exists
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      const data = {
        name: userName,
        email: userEmail,
        credit: 5,
      };
      // Insert New user
      await setDoc(doc(db, "users", userEmail), data);

      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(`Error happened while checking user account: ${error}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
