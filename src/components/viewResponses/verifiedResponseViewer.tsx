import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineContactPage } from "react-icons/md";
import { GoClock } from "react-icons/go";
import Card from "./card";

interface responses {
  formId: string;
  userId?: string;
  userName?: string;
  email?: string;
  _id: string;
  submittedAt: string;
}

const VerifiedResponseViewer = ({
  allVerifiedResponses,
}: {
  allVerifiedResponses: responses[];
}) => {
  const [showResponses, setShowResponses] = useState(false);

  const [selectedItem, setSelectedItem] = useState(-1);

  const handleDropClick = async (index: number) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === index ? -1 : index
    );
  };
  return (
    <div className="bg-white container max-w-3xl rounded-xl  sm:p-5 p-1">
      <div className="flex items-center justify-between">
        <div className="">Verified Responses</div>
        <div
          className={`p-2 hover:bg-gray-100 rounded-full cursor-pointer animate-bounce `}
          onClick={() => setShowResponses(!showResponses)}
        >
          <IoIosArrowDown
            size={20}
            className={`${showResponses && " rotate-180"}`}
          />
        </div>
      </div>
      {showResponses && (
        <div className="sm:p-5 pr-0 flex flex-col space-y-4">
          {allVerifiedResponses.map((response: responses, index: number) => {
            return (
              <div key={index}>
                <div className="flex flex-col bg-gray-50 rounded-md p-2 shadow-lg">
                  <div className="flex flex-col justify-center sm:flex-row  w-full sm:justify-between items-center bg-gray-100 rounded-md p-2 hover:bg-gray-200 cursor-pointer  ">
                    <div className="pr-2">
                      <MdOutlineContactPage size={30} />
                    </div>
                    <div className="felx flex-col w-full pr-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center">
                        <div className="text-gray-500 text-sm">
                          {response.userName}
                        </div>
                        <div className="text-gray-500 text-sm flex items-center">
                          <GoClock />
                          <span className="pl-1">
                            {new Date(response.submittedAt).toLocaleString(
                              undefined,
                              {
                                dateStyle: "short",
                                timeStyle: "short",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-center sm:text-start">
                        {response.email}
                      </div>
                    </div>

                    <div
                      className="p-2 hover:bg-gray-300 rounded-full cursor-pointer"
                      onClick={() => handleDropClick(index)}
                    >
                      <IoIosArrowDown
                        size={20}
                        className={`${selectedItem === index && "rotate-180"}`}
                      />
                    </div>
                  </div>
                  {selectedItem === index && <Card responseId={response._id} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerifiedResponseViewer;
