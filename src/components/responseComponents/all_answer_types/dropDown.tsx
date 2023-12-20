import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAlertCircleOutline } from "react-icons/io5";
import { answerFormField } from "@/redux/features/responseField/responseFieldSlice";
import { RootState } from "@/redux/store/store";

interface Props {
  options: string[];
  required: boolean;
  fieldId: string;
}

const DropDown: React.FC<Props> = ({ options, required, fieldId }) => {
  const dispatch = useDispatch();
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const answer = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.answer as string;

  const [selectedValue, setSelectedValue] = useState<string>(answer ?? "");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    console.log("Selected value:", newValue);
    setSelectedValue(newValue);
    // You can dispatch an action or perform any other logic with the selected value here
  };

  const handleClearSelection = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    dispatch(answerFormField({ formFieldId: fieldId, answer: selectedValue }));
  }, [dispatch, fieldId, selectedValue]);

  return (
    <div>
      <select
        className="bg-gray-50 focus:bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 cursor-pointer"
        name={`DropDown_${fieldId}}`}
        id={fieldId}
        required={required}
        value={selectedValue as string}
        onChange={handleSelectChange}
      >
        <option key="Choose" value="">
          Choose
        </option>
        {options.map((option) => (
          <option key={option as string} value={option as string}>
            {option}
          </option>
        ))}
      </select>

      {selectedValue && (
        <div className="flex justify-end items-center mt-3">
          <button
            className="text-sm p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        </div>
      )}

      {required && !selectedValue && (
        <p className="text-red-500 text-sm mt-4  pt-2  flex space-x-2 items-center">
          <IoAlertCircleOutline size={20} />
          <span>This field is required.</span>
        </p>
      )}
    </div>
  );
};

export default DropDown;
