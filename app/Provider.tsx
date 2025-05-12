"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./context/UserDetailContext";
import Footer from "./components/Footer";

interface IUser {
  name: string;
  credit: number;
  email: string;
}

function Provider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<IUser>();
  // save user data
  const checkUserAuth = async () => {
    // save user to dataBase
    const result = await axios.post("/api/users", {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    // console.log(result?.data);
    setUserDetail(result?.data);
  };
  useEffect(() => {
    user && checkUserAuth();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 ">{children}</div>
        <Footer/>
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
