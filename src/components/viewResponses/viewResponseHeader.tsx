import React, { useEffect, useRef, useState } from "react";
import { ImCloudDownload } from "react-icons/im";
import { RiDeleteBin6Line, RiSearchLine, RiUserLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  handleAcceptingResponseChange,
  handleAcceptingResponsesTillChange,
} from "@/redux/features/formField/formFieldSlice";
import ConfirmationModal from "./confirmation_modal";

const ViewResponseHeader = ({
  TotalResponses,
  activeTab,
  handleTabChange,
}: {
  TotalResponses: number;
  activeTab: string;
  handleTabChange: (arg0: string) => void;
}) => {
  const dispatch = useDispatch();
  const acceptingResponse = useSelector(
    (state: RootState) => state.formField.acceptingResponses
  ) as boolean;
  const acceptingResponseTill = useSelector(
    (state: RootState) => state.formField.acceptingResponsesTill
  );
  const formId = useSelector((state: RootState) => state.formField._id);
  const [showDropDown, setShowDropDown] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showDateAndTime, setShowDateAndTime] = useState(
    acceptingResponseTill !== "" ? true : false
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(acceptingResponseTill?.split("T")[0] ?? "");
  const [time, setTime] = useState(
    acceptingResponseTill?.split("T")[1]?.slice(0, -1) ?? ""
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleAcceptingResponseEditingToggle = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/setAcceptingResponse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: formId,
          acceptingResponse: !acceptingResponse,
        }),
      }
    );
    const resp = await res.json();
    if (resp.success) {
      dispatch(
        handleAcceptingResponseChange({ AcceptingResponse: !acceptingResponse })
      );
    }
  };

  const handleDateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    if (!date || !time) return;
    const updatedDate = new Date(`${date}T${time}:00`);
    if (isNaN(updatedDate.getTime())) return;
    const updatedMongoDate = updatedDate.toISOString();
    const handleAcceptingResponseTill = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setAcceptingResponseTill`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formId,
            acceptingResponseTill: updatedMongoDate,
          }),
        }
      );
      const resp = await res.json();
      if (resp.success) {
        dispatch(
          handleAcceptingResponsesTillChange({
            acceptingResponsesTill: updatedMongoDate,
          })
        );
      }
    };
    handleAcceptingResponseTill();
  }, [date, dispatch, formId, time]);

  const handleClearSelection = async () => {
    setDate("");
    setTime("");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/setAcceptingResponseTill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: formId,
          acceptingResponseTill: "",
        }),
      }
    );
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setAcceptingResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId: formId,
        acceptingResponse: acceptingResponse,
      }),
    });
    const resp = await res.json();
    if (resp.success) {
      dispatch(
        handleAcceptingResponsesTillChange({
          acceptingResponsesTill: "",
        })
      );
    }
    setShowDateAndTime(false);
    setShowDropDown(false);
  };

  const handleResponsesDownload = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exportResponsesToCSV`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: formId,
        }),
      }
    );
    const resp = await res.json();
    if (resp.success) {
      const blob = new Blob([resp.csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = "responses.csv";
      link.click();
    }
    setShowDropDown(false);
  };

  return (
    <>
      {deleteConfirmation && (
        <ConfirmationModal
          setDeleteConfirmation={setDeleteConfirmation}
          formId={formId as string}
        />
      )}
      <div className="bg-white container max-w-3xl rounded-xl border-t-8 border-t-red-200 p-5">
        <div className="relative flex justify-between items-center">
          <div className="">
            <div className="text-2xl font-bold text-gray-800">
              {TotalResponses} Response
            </div>
          </div>
          <div className="flex items-center space-x-3" ref={dropdownRef}>
            <div onClick={() => setShowDropDown(!showDropDown)}>
              <BsThreeDotsVertical
                size={35}
                className={` p-2 rounded-full cursor-pointer ${
                  showDropDown ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              />
            </div>
            {showDropDown && (
              <div className="absolute z-10 right-9 top-2 bg-gray-100 flex flex-col space-y-1 p-1 rounded-md cursor-pointer">
                <div
                  className="flex items-center space-x-3 p-2  rounded-md hover:bg-gray-200"
                  onClick={handleResponsesDownload}
                >
                  <ImCloudDownload size={20} />
                  <span className="text-medium font-medium text-gray-600">
                    Download responses (.csv)
                  </span>
                </div>
                <div
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                  onClick={() => setDeleteConfirmation(true)}
                >
                  <RiDeleteBin6Line size={20} />
                  <span className="text-medium font-medium text-gray-600">
                    Delete all responses
                  </span>
                </div>
                {!showDateAndTime && (
                  <div
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    onClick={() => setShowDateAndTime(true)}
                  >
                    <MdAccessTime size={20} />
                    <span className="text-medium font-medium text-gray-600">
                      Add Timely Resposne
                    </span>
                  </div>
                )}
                {showDateAndTime && (
                  <div
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200"
                    onClick={handleClearSelection}
                  >
                    <MdAccessTime size={20} />
                    <span className="text-medium font-medium text-gray-600">
                      Remove Timely Resposne
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className={`relative flex flex-col sm:flex-row  sm:justify-between items-center space-y-4 sm:space-y-0 ${
            acceptingResponse ? "mt-5" : "bg-red-600 p-4 rounded-md mt-2"
          }`}
        >
          <div className=" flex flex-col sm:flex-row items-center text-sm space-x-2">
            {showDateAndTime && (
              <>
                <input
                  type="date"
                  id="date"
                  name={`date`}
                  placeholder="Day,Month,Year"
                  value={date}
                  onChange={handleDateChange}
                  className="p-3 border-b cursor-pointer rounded-md"
                />
                <input
                  type="time"
                  id="time"
                  name={`time`}
                  value={time}
                  onChange={handleTimeChange}
                  className="p-3 border-b cursor-pointer rounded-md"
                />
              </>
            )}
          </div>
          <div className="flex items-center">
            {acceptingResponse && (
              <label className="pr-2 text-xs pt-1">Accepting responses</label>
            )}
            {!acceptingResponse && (
              <label className="pr-2 text-xs text-white pt-1">
                Not Accepting responses
              </label>
            )}
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={acceptingResponse}
              onChange={handleAcceptingResponseEditingToggle}
            />
          </div>
        </div>
        <div className="">
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-1/2 h-[1px] bg-gray-200"></div>
            <div className="text-sm text-gray-400">Responses</div>
            <div className="w-1/2 h-[1px] bg-gray-200"></div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 w-full mt-5">
              <div
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 w-1/2 justify-center cursor-pointer ${
                  activeTab === "search" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleTabChange("search")}
              >
                <RiSearchLine size={20} />
                <span className="hidden sm:block text-medium font-medium text-gray-600">
                  Search
                </span>
              </div>
              <div
                className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 w-1/2 justify-center cursor-pointer ${
                  activeTab === "individual" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleTabChange("individual")}
              >
                <RiUserLine size={20} />
                <span className="hidden sm:block text-medium font-medium text-gray-600">
                  Individual
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewResponseHeader;
