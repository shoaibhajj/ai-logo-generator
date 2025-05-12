"use client";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { db } from "@/configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { MorphingDialog } from "@/components/motion-primitives/morphing-dialog";
import { MorphingDialogBasicImage } from "@/components/motion-primitives/MorphingDialogBasicImage";
interface ILogo {
  createdAt: string;
  desc: string;
  imageUrl: string;
  title: string;
  id: string; // Added ID field
}

function LogoList() {
  const { userDetail } = useContext(UserDetailContext);
  const [logos, setLogos] = useState<ILogo[]>([]);

  const GetUserLogo = async () => {
    if (!userDetail?.email) return;

    try {
      const logosCollectionRef = collection(
        db,
        "users",
        userDetail.email,
        "logos"
      );

      const querySnapshot = await getDocs(logosCollectionRef);

      // Map all documents at once
      const logosData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Use document ID as key
        ...(doc.data() as Omit<ILogo, "id">),
      }));

      setLogos(logosData.reverse()); // Single state update
    } catch (e) {
      console.error("Error fetching logos:", e);
    }
  };

  useEffect(() => {
    userDetail && GetUserLogo();
  }, [userDetail]);

  const ViewLogo = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 ">
        {logos.length > 0
          ? logos.map((logo) => (
              <div
                key={logo.id} // Use document ID instead of index
                className="hover:scale-105 transition-all cursor-pointer"
                // onClick={() => ViewLogo(logo.imageUrl)}
              >
                <MorphingDialogBasicImage
                  imageUrl={logo.imageUrl}
                  alt={logo.title}
                  width={300}
                  height={300}
                />

                <h2 className="text-center text-lg font-medium mt-2">
                  {logo.title}
                </h2>
                <p className="text-sm text-gray-500 text-center overflow-hidden text-ellipsis whitespace-nowrap h-10">
                  {logo.desc}
                </p>
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-xl w-full h-[300px] animate-pulse"
              />
            ))}
      </div>
    </div>
  );
}

export default LogoList;
