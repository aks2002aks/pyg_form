import React from "react";

const SubmitResponse = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  rounded w-full">
      <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:pl-12 md:pr-12 pt-4 pb-5">
        <div className="w-full flex flex-col space-y-4 justify-center items-center">
          <div className="bg-white container max-w-2xl rounded-xl border-t-8 border-t-red-200">
            {children}

          </div>
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col  justify-center items-center p-4 md:pl-12 md:pr-12 pb-20">
        <div className="w-full flex flex-col justify-center items-center space-y-4 text-center">
          <div className="container max-w-2xl text-sm">
            This content is neither created nor endorsed by PYG. 
          </div>
          <div className="container max-w-2xl text-2xl ">
            <strong>PYG</strong> Forms
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitResponse;
