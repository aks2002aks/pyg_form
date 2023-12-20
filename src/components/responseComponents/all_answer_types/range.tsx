import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  answerFormField,
  rangeFromFormField,
  rangeToFormField,
} from "@/redux/features/responseField/responseFieldSlice";
import { IoAlertCircleOutline } from "react-icons/io5";
import { RootState } from "@/redux/store/store";

interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  step: number;
  required: boolean;
  fieldId: string;
}

const Range: React.FC<RangeSliderProps> = ({
  minValue,
  maxValue,
  step,
  required,
  fieldId,
}) => {
  const dispatch = useDispatch();
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const rangeTo = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.rangeTo as number;

  const rangeFrom = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.rangeFrom as number;

  const [selectedRangeCount, setSelectedRangeCount] = useState<
    [number, number]
  >([rangeFrom ?? 0, rangeTo ?? 0]);

  const handleGuestCountChange = (GuestCount: number | number[]) => {
    if (Array.isArray(GuestCount)) {
      setSelectedRangeCount(GuestCount as [number, number]);
    }
  };

  useEffect(() => {
    dispatch(answerFormField({ formFieldId: fieldId, answer: "yes" }));
    dispatch(
      rangeToFormField({ formFieldId: fieldId, rangeTo: selectedRangeCount[1] })
    );
    dispatch(
      rangeFromFormField({
        formFieldId: fieldId,
        rangeFrom: selectedRangeCount[0],
      })
    );
  }, [dispatch, fieldId, selectedRangeCount]);

  return (
    <>
      <div className="flex flex-col items-start space-x-4">
        <div className="w-1/2 pl-2 mt-3">
          <Slider
            range
            value={selectedRangeCount}
            onChange={handleGuestCountChange}
            min={minValue}
            max={maxValue}
            step={step}
          />
          <div className="flex items-center justify-between">
            <span>{selectedRangeCount[0]}</span>
            <span>{selectedRangeCount[1]}</span>
          </div>
          <div className="mt-4">
            Selected Range: {selectedRangeCount[0]} - {selectedRangeCount[1]}
          </div>
        </div>
      </div>
      {selectedRangeCount[1] !== 0 && (
        <div className="flex justify-end items-center mt-3">
          <button
            className="text-sm p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setSelectedRangeCount([0, 0]);
            }}
          >
            Clear Selection
          </button>
        </div>
      )}

      {required && selectedRangeCount[1] === 0 && (
        <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
          <IoAlertCircleOutline size={20} />
          <span>This field is required.</span>
        </p>
      )}
    </>
  );
};

export default Range;
