import {
  answerFormField,
  dateFormField,
  timeFormField,
} from "@/redux/features/responseField/responseFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface props {
  showIncludeTime: boolean;
  required: boolean;
  fieldId: string;
}
const Date: React.FC<props> = ({ required, showIncludeTime, fieldId }) => {
  const dispatch = useDispatch();
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );
  const answerdate = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.date as string;

  const answertime = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.time as string;

  const [date, setDate] = useState(answerdate ?? "");
  const [time, setTime] = useState(answertime ?? "");

  useEffect(() => {
    if (date) {
      dispatch(answerFormField({ formFieldId: fieldId, answer: "yes" }));
    } else {
      dispatch(answerFormField({ formFieldId: fieldId, answer: "" }));
    }
    if (showIncludeTime) {
      dispatch(timeFormField({ formFieldId: fieldId, time: time }));
    }
    dispatch(dateFormField({ formFieldId: fieldId, date: date }));
  }, [date, dispatch, fieldId, showIncludeTime, time]);

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

  const handleClearSelection = () => {
    setDate("");
    setTime("");
  };

  return (
    <>
      <div className="flex space-x-3 items-center">
        <input
          type="date"
          id="date"
          name={`date_${fieldId}}`}
          placeholder="Day,Month,Year"
          value={date}
          onChange={handleDateChange}
          className="p-3 border-b cursor-pointer rounded-md"
          required={required}
        />

        {showIncludeTime && (
          <>
            <input
              type="time"
              id="time"
              name={`time_${fieldId}}`}
              value={time}
              onChange={handleTimeChange}
              className="p-3 border-b cursor-pointer rounded-md"
              required={required}
            />
          </>
        )}
      </div>
      <div className="">
        {date && date && (showIncludeTime ? time : true) && (
          <div className="flex justify-end items-center mt-3">
            <button
              className="text-sm p-2 hover:bg-gray-100 rounded-lg"
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          </div>
        )}

        {required && (!date || (showIncludeTime ? !time : false)) && (
          <p className="text-red-500 text-sm mt-4  pt-2  flex space-x-2 items-center">
            <IoAlertCircleOutline size={20} />
            <span>This field is required.</span>
          </p>
        )}
      </div>
    </>
  );
};

export default Date;
