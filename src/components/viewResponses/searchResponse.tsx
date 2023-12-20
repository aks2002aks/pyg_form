import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoClock } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineContactPage } from "react-icons/md";
import Card from "./card";

const SearchResponse = () => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [allResponses, setAllResponses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleDropClick = async (index: number) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === index ? -1 : index
    );
  };

  const handleSearch = async () => {
    console.log("Searching for:", searchText);
    console.log("Search type:", searchType);

    if (searchType === "email") {
      console.log("Searching by email");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getAllResponsesByEmailId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: searchText,
          }),
        }
      );
      const resp = await res.json();
      setAllResponses(resp.response);
    } else if (searchType === "responseId") {
      console.log("Searching by responseId");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getResponseByResponseId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            responseId: searchText,
          }),
        }
      );
      const resp = await res.json();
      const response = [resp.response];
      setAllResponses(response as any);
    } else {
      toast.error("Please enter a valid email or responseId");
    }
    console.log("allResponses", allResponses);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const validateInput = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const responseIdRegex = /^[a-zA-Z0-9]+$/;

    if (emailRegex.test(input)) {
      setSearchType("email");
    } else if (responseIdRegex.test(input)) {
      setSearchType("responseId");
    } else {
      setSearchType("");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-3xl flex  py-2">
        <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2">
          <input
            className="font-bold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="text"
            placeholder="Search By Response Id or Email"
            onChange={(e) => {
              setSearchText(e.target.value);
              validateInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />

          <div
            className="bg-gray-600 p-2 hover:bg-red-200 cursor-pointer mx-2 rounded-full text-white hover:text-black"
            onClick={handleSearch}
          >
            <svg
              className="w-6 h-6 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white container max-w-3xl rounded-xl  sm:p-5 p-1">
        {allResponses.length > 0 && (
          <div className="sm:p-5 pr-0 flex flex-col space-y-4">
            {allResponses.map((response: any, index: number) => {
              return (
                <div key={index}>
                  <div className="flex flex-col bg-gray-50 rounded-md p-2 shadow-lg">
                    <div className="flex flex-col justify-center sm:flex-row  w-full sm:justify-between items-center bg-gray-100 rounded-md p-2 hover:bg-gray-200 cursor-pointer ">
                      <div className="pr-2">
                        <MdOutlineContactPage size={30} />
                      </div>
                      <div className="felx flex-col w-full pr-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center ">
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
                        <div className="text-gray-500 text-sm text-center sm:text-start">
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
            })}
          </div>
        )}
        {allResponses.length === 0 && (
          <div className="p-5 pr-0 flex flex-col space-y-4">
            No Response Found
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResponse;
