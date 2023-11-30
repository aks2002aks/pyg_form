import React from "react";
import { motion } from "framer-motion";

interface StepsProps {
  step: number;
}

const steps: React.FC<StepsProps> = ({ step }) => {
  const fillVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%" },
  };
  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/3">
          <div className="relative mb-2">
            <div className="w-10 h-10 mx-auto bg-red-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  />
                </svg>
                
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Enter Details</div>
        </div>

        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <motion.div
                  className={`w-0 bg-red-300 py-1 rounded`}
                  style={{ width: `${step >= 2 ? "100%" : "0%"}` }}
                  variants={fillVariants}
                  initial="hidden"
                  animate={step >= 2 ? "visible" : "hidden"}
                ></motion.div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center ${
                step >= 2 ? "bg-red-500" : "bg-white border-2 border-gray-200"
              }`}
            >
              <span
                className={`text-center  w-full ${
                  step >= 2 ? "text-white" : "text-gray-600"
                }`}
              >
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Verify</div>
        </div>

        <div className="w-1/3">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <motion.div
                  className={`w-0 bg-red-300 py-1 rounded`}
                  style={{ width: `${step >= 3 ? "100%" : "0%"}` }}
                  variants={fillVariants}
                  initial="hidden"
                  animate={step >= 3 ? "visible" : "hidden"}
                ></motion.div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto  rounded-full text-lg text-white flex items-center ${
                step === 3 ? "bg-red-500" : "bg-white border-2 border-gray-200"
              }`}
            >
              <span
                className={`text-center  w-full ${
                  step === 3 ? "text-white" : "text-gray-600"
                }`}
              >
                <svg
                  className="w-full fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Reset Password</div>
        </div>
      </div>
    </div>
  );
};

export default steps;
