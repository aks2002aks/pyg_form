import React from "react";

const EditFormPageSkeleton = () => {
  return (
    <>
      <div className="flex justify-center border-b animate-pulse">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="hidden md:block mx-1 w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="hidden md:block mx-1 w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            <div className="hidden md:block mx-1 w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b animate-pulse">
        <div className="flex overflow-x-auto whitespace-nowrap ml-4">
          <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
            <div className="hidden md:block mx-1 w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex overflow-x-auto whitespace-nowrap">
          <div className="flex items-center mr-6">
            <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            </div>
            <div className="inline-flex items-center h-12 px-2 py-2 bg-transparent border-gray-300 -px-1 whitespace-nowrap">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 rounded">
        <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 pb-20">
          <div className="w-full flex flex-col space-y-4 justify-center items-center">

            <div className="container mx-auto max-w-3xl bg-white rounded-xl border-t-8 border-red-200 animate-pulse">
              <div className="p-5 w-full border-l-6 border-transparent rounded-lg">
                <div className="h-10 bg-gray-200 rounded w-full "></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            <div className="container mx-auto max-w-3xl bg-white rounded-xl animate-pulse">
              <div className="p-5 w-full border-l-6 border-transparent rounded-lg">
                <div className="flex items-center space-x-2">
                <div className="h-10 bg-gray-200 rounded w-2/3 "></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 "></div>
                </div>
                
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFormPageSkeleton;
