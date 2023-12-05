"use client"

import React, { useEffect } from "react";
import SingupPage from "./singupPage";
import {redirect} from "next/navigation";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      redirect("/forms");
    }
  }, [session, status]);

  return (
    <>
      <SingupPage />
    </>
  );
};

export default SignUp;
