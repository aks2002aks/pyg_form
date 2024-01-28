// http://localhost:3000/create?formid=184y418481491y324y

import React, { use, useCallback, useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BsClipboardCheckFill } from "react-icons/bs";
import { FaFileCircleQuestion } from "react-icons/fa6";
import Questions from "@/components/formComponents/Questions";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  setAllFormFields,
  setFormName,
} from "@/redux/features/formField/formFieldSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import AccessDenied from "@/components/access_denied/access_denied";
import { BsFillEyeFill } from "react-icons/bs";
import { MdPublish } from "react-icons/md";
import { FaFileWaveform } from "react-icons/fa6";
import Link from "next/link";
import ShareModal from "@/components/modal/shareModal";
import Settings from "@/components/formComponents/Settings";
import Responses from "@/components/formComponents/Responses";

const EditFormPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const formId = searchParams.get("formid");
  const { data: session, status } = useSession();
  const [showQuestions, setShowQuestions] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const formUserId = useSelector((state: RootState) => state.formField.userId);
  const formName = useSelector((state: RootState) => state.formField.formName);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "Questions") {
      setShowQuestions(true);
      setShowResponse(false);
      setShowSetting(false);
    } else if (view === "Responses") {
      setShowQuestions(false);
      setShowResponse(true);
      setShowSetting(false);
    } else if (view === "Settings") {
      setShowQuestions(false);
      setShowResponse(false);
      setShowSetting(true);
    }
  }, [searchParams]);

  //make a api to fetch the formfields of the formid
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchFormFields = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getFormById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            formId: formId,
          }),
          signal,
        }
      );
      const { success, form } = await res.json();
      if (success) {
        dispatch(setAllFormFields(form));
      }
    };

    fetchFormFields();
    return () => {
      controller.abort();
    };
  }, [dispatch, formId, session?.user.accessToken, session?.user.id]);

  const handleFormNameBlur = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setFormName`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            formName: formName,
            formId: formId,
          }),
        }
      );

      const { success } = await res.json();

      if (!success) {
        console.error("Failed to edit question form name.");
      }
    } catch (error) {
      console.error("Error editing question form name:", error);
    }
  };

  const handleFormNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormName(event.target.value));
  };

  if (formUserId === session?.user?.id) {
    return (
      <>
        <div className="">
          <ShareModal
            openShare={openShare}
            setOpenShare={setOpenShare}
            postId={formId as string}
          />
        </div>

        <div className="flex justify-between items-center  border-b md:p-3 p-2">
          <div className="flex  items-center overflow-x-auto whitespace-nowrap ">
            <Link href={`/forms`}>
              <FaFileWaveform size={25} />
            </Link>
            <input
              type="text"
              className="focus:border-b focus:border-black focus:outline-none  w-full  py-1 text-xl  mr-4 ml-2"
              value={formName}
              onChange={handleFormNameChange}
              onBlur={handleFormNameBlur}
            />
          </div>
          <div className="flex space-x-4">
            <Link href={`/forms/form?formid=${formId}`} target="_blank">
              <BsFillEyeFill
                size={35}
                title="Preview Form"
                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
              />
            </Link>

            <MdPublish
              size={35}
              title="Publish Form"
              className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
              onClick={() => setOpenShare(true)}
            />
          </div>
        </div>

        <div className="flex justify-center  border-b">
          <div className="flex overflow-x-auto whitespace-nowrap">
            <button
              className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none    ${
                showQuestions ? "border-red-600 border-b-2" : ""
              }`}
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("view", "Questions")
                );
                setShowQuestions(true);
                setShowResponse(false);
                setShowSetting(false);
              }}
            >
              <FaFileCircleQuestion size={15} title="Questions" />

              <span className="hidden md:block mx-1 text-sm sm:text-base">
                Questions
              </span>
            </button>

            <button
              className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4 -px-1  whitespace-nowrap  focus:outline-none     ${
                showResponse ? "border-red-600 border-b-2" : ""
              }`}
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("view", "Responses")
                );

                setShowQuestions(false);
                setShowResponse(true);
                setShowSetting(false);
              }}
            >
              <BsClipboardCheckFill size={15} title="Responses" />

              <span className="hidden md:block mx-1 text-sm sm:text-base">
                Responses
              </span>
            </button>

            <button
              className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-gray-300 sm:px-4  -px-1  whitespace-nowrap focus:outline-none    ${
                showSetting ? "border-red-600 border-b-2" : ""
              }`}
              onClick={() => {
                router.push(
                  pathname + "?" + createQueryString("view", "Settings")
                );

                setShowQuestions(false);
                setShowResponse(false);
                setShowSetting(true);
              }}
            >
              <IoSettings size={15} title="Settings" />

              <span className="hidden md:block mx-1 text-sm sm:text-base">
                Settings
              </span>
            </button>
          </div>
        </div>

        {showQuestions && <Questions />}
        {showResponse && <Responses />}
        {showSetting && <Settings />}
      </>
    );
  } else {
    return <AccessDenied />;
  }
};

export default EditFormPage;
