// http://localhost:3000/create?formid=184y418481491y324y

"use client";

import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BsClipboardCheckFill } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import CreateForm from "@/components/formComponents/CreateForm";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { setAllFormFields } from "@/redux/features/formField/formFieldSlice";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const formId = useSearchParams().get("formid");
  const { data: session, status } = useSession();
  const [showQuestions, setShowQuestions] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  //make a api to fetch the formfields of the formid
  useEffect(() => {
    const fetchFormFields = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getFormById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formId,
            userId: session?.user?.id as string,
          }),
        }
      );

      const { success, form } = await res.json();

      if (success) {
        dispatch(setAllFormFields(form));
      }
    };

    fetchFormFields();
  }, [dispatch, formId, session?.user?.firstName, session?.user?.id]);

  return (
    <>

      <div className="flex justify-center  border-b">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none hover:border-b-2  hover:border-red-600 ${showQuestions ? "border-red-600 border-b-2" : ""
              }`}
            onClick={() => {
              setShowQuestions(true);
              setShowResponse(false);
              setShowSetting(false);
            }}
          >
            <FaFileCircleQuestion size={15} />

            <span className="hidden md:block mx-1 text-sm sm:text-base">Questions</span>
          </button>

          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4 -px-1  whitespace-nowrap  focus:outline-none  hover:border-b-2  hover:border-red-600 ${showResponse ? "border-red-600 border-b-2" : ""
              }`}
            onClick={() => {
              setShowQuestions(false);
              setShowResponse(true);
              setShowSetting(false);
            }}
          >
            <BsClipboardCheckFill size={15} />

            <span className="hidden md:block mx-1 text-sm sm:text-base">Responses</span>
          </button>

          <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none hover:border-b-2  hover:border-red-600 ${showSetting ? "border-red-600 border-b-2" : ""
              }`}
            onClick={() => {
              setShowQuestions(false);
              setShowResponse(false);
              setShowSetting(true);
            }}
          >
            <IoSettings size={15} />

            <span className="hidden md:block mx-1 text-sm sm:text-base">Setting</span>
          </button>
        </div>
      </div>

      {showQuestions && <CreateForm />}
      {showResponse && <div>Response</div>}
      {showSetting && <div>Setting</div>}
    </>
  );
};

export default Page;
