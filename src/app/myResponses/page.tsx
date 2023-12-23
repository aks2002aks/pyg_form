"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineContactPage } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import Card from "@/components/viewResponses/card";

interface responses {
  formId: string;
  userId?: string;
  userName?: string;
  email?: string;
  _id: string;
  submittedAt: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [allVerifiedResponses, setAllVerifiedResponses] = useState<responses[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleDropClick = async (index: number) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === index ? -1 : index
    );
  };

  useEffect(() => {
    const getAllResponses = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getAllResponsesByEmailId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: session?.user?.email,
          }),
        }
      );
      const resp = await res.json();
      setAllVerifiedResponses(resp.response);
    };
    getAllResponses();
  }, [session?.user?.email]);
  return (
    <div className="rounded w-full ">
      <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:pl-12 md:pr-12 pt-4 pb-5">
        <div className="w-full flex flex-col space-y-4 justify-center items-center max-w-3xl">
          <div className="sm:p-5 pr-0 flex flex-col space-y-4 w-full">
            {allVerifiedResponses.length > 0 ? (
              <>
                {allVerifiedResponses.map(
                  (response: responses, index: number) => {
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
                                    {new Date(
                                      response.submittedAt
                                    ).toLocaleString(undefined, {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    })}
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
                                className={`${
                                  selectedItem === index && "rotate-180"
                                }`}
                              />
                            </div>
                          </div>
                          {selectedItem === index && (
                            <Card responseId={response._id} />
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              <>
              <div className="text-center">No response available.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
