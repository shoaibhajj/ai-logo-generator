"use client";
import { UserDetailContext } from "@/app/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div>
      <div className="flex justify-between items-center gap-10 md:gap-0">
        <h2 className="font-bold text-xl  md:text-3xl text-primary">
          Hello, {userDetail?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Image src={"/coin.png"} alt="coin" width={40} height={40} />
          <h2 className="font-bold text-xl  md:text-3xl ">
            {userDetail?.credit} Credit Left
          </h2>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 gap-10">
        <h2 className="font-bold text-2xl ">Dashboard</h2>
        <Link href={"/create"}>
          <Button>+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
}

export default Info;
