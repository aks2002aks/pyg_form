import {
  answerFormField,
  timeFormField,
} from "@/redux/features/responseField/responseFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface props {
  required: boolean;
  fieldId: string;
}

const Time: React.FC<props> = ({ required, fieldId }) => {
  const dispatch = useDispatch();
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const answertime = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.time as string;
  const [time, setTime] = useState(answertime ?? "");

  useEffect(() => {
    if (time) {
      dispatch(answerFormField({ formFieldId: fieldId, answer: "yes" }));
    } else {
      dispatch(answerFormField({ formFieldId: fieldId, answer: "" }));
    }

    dispatch(timeFormField({ formFieldId: fieldId, time: time }));
  }, [dispatch, fieldId, time]);

  const handleTimeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTime(event.target.value);
  };

  const handleClearSelection = () => {
    setTime("");
  };

  return (
    <>
      <div className="flex space-x-3 items-center">
        <input
          type="time"
          id="time"
          name={`time_${fieldId}}`}
          value={time}
          onChange={handleTimeChange}
          className="p-3 border-b cursor-pointer rounded-md"
          required={required}
        />
      </div>
      <div className="">
        {time && (
          <div className="flex justify-end items-center mt-3">
            <button
              className="text-sm p-2 hover:bg-gray-100 rounded-lg"
              onClick={handleClearSelection}
            >
              Clear Selection
            </button>
          </div>
        )}

        {required && !time && (
          <p className="text-red-500 text-sm mt-4  pt-2  flex space-x-2 items-center">
            <IoAlertCircleOutline size={20} />
            <span>This field is required.</span>
          </p>
        )}
      </div>
    </>
  );
};

export default Time;
