// http://localhost:3000/create?formid=184y418481491y324y

"use client";

import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BsClipboardCheckFill } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import CreateForm from "@/components/formComponents/CreateForm";

const Page = () => {
  const [showQuestions, setShowQuestions] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  return (
    <>
      <div className="flex justify-center  border-b">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none hover:border-b-2  hover:border-red-600 ${
              showQuestions ? "border-red-600 border-b-2" : ""
            }`}
            onClick={() => {
              setShowQuestions(true);
              setShowResponse(false);
              setShowSetting(false);
            }}
          >
            <FaFileCircleQuestion size={15} />

            <span className="mx-1 text-sm sm:text-base">Questions</span>
          </button>

          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4 -px-1  whitespace-nowrap  focus:outline-none  hover:border-b-2  hover:border-red-600 ${
              showResponse ? "border-red-600 border-b-2" : ""
            }`}
            onClick={() => {
              setShowQuestions(false);
              setShowResponse(true);
              setShowSetting(false);
            }}
          >
            <BsClipboardCheckFill size={15} />

            <span className="mx-1 text-sm sm:text-base">Responses</span>
          </button>

          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none hover:border-b-2  hover:border-red-600 ${
              showSetting ? "border-red-600 border-b-2" : ""
            }`}
            onClick={() => {
              setShowQuestions(false);
              setShowResponse(false);
              setShowSetting(true);
            }}
          >
            <IoSettings size={15} />

            <span className="mx-1 text-sm sm:text-base">Setting</span>
          </button>
        </div>
      </div>
      {showQuestions && (
        <CreateForm
          myformData={{
            _id: "5fc5bf01f25eeea23c5fe6d6",
            formFields: [
              {
                type: "Title and description",
                id: "some-unique-id-4",
                label: "My Second Form",
                required: false,
                focus: false,
              },
              {
                type: "Paragraph",
                id: "some-unique-id-5",
                label: "Share your thoughts on the following topic",
                required: true,
                focus: true,
              },
              {
                type: "Checkboxes",
                id: "some-unique-id-6",
                label: "Select your hobbies",
                options: ["Reading", "Traveling", "Sports"],
                required: false,
                focus: false,
              },
              {
                type: "File upload",
                id: "some-unique-id-9",
                label: "Upload your resume",
                required: true,
                focus: false,
              },
              {
                type: "Time",
                id: "some-unique-id-10",
                label: "Select your preferred time",
                required: false,
                focus: false,
              },
            ],
            userId: "12345678",
            user: "Ashwani",
          }}
        />
      )}
      {showResponse && <div>Response</div>}
      {showSetting && <div>Setting</div>}
    </>
  );
};

export default Page;
