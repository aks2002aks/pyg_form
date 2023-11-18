"use client";

import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <div className=" bg-gray-100 ">
        <div className="container md:px-48 px-5 bg-gray-100 flex flex-col  mx-auto">
          <div className="p-5 pl-1 items-center justify-start">
            <h1>Start New Form</h1>
          </div>
          <div className="flex flex-wrap pb-8">
            <div className=" flex  flex-col ">
              <Image
                src="/redPlus.jpg"
                height={150}
                width={150}
                alt="red plus sign"
                className="rounded-md  border hover:border-red-400 cursor-pointer"
              />

              <div className="p-2 text-sm">Blank Form</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container  md:px-48 px-5  flex flex-col  mx-auto">
        <div className="py-4">
          <h1>Recent Forms</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
// /user/setUpVendor/services?service=${selectedService}
