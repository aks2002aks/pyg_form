"use client";

import React, { Suspense } from "react";
import ResponsePage from "./responsePage";
import ResponsePageSkeleton from "./responsePageSkeleton";

const Page = () => {
  return (
    <div>
      <Suspense fallback={ <ResponsePageSkeleton/>}>
         <ResponsePage/>
      </Suspense>
    </div>
  );
};

export default Page;
