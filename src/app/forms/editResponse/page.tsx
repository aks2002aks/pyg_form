"use client";

import React, { Suspense } from "react";
import EditResponsePage from "./editResponsePage";
import ResponsePageSkeleton from "../form/responsePageSkeleton";

const Page = () => {
  return (
    <div>
      <Suspense fallback={ <ResponsePageSkeleton/>}>
         <EditResponsePage/>
      </Suspense>
    </div>
  );
};

export default Page;
