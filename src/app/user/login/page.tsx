"use client"

import React, { useEffect } from "react";
import LoginPage from "./loginPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/forms");
    }
  }, [router, session, status]);

  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
