"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const formid = useSearchParams().get("formid");
  return <div>Page - {formid}</div>;
};

export default Page;
