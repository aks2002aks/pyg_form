import { answerFormField } from "@/redux/features/responseField/responseFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import CheckboxesValidation from "../all_validation_types/checkboxesValidation";

interface Props {
  options: string[];
  required: boolean;
  isOther: boolean;
  fieldId: string;
  validation: any;
}

const Checkboxes: React.FC<Props> = ({
  options,
  required,
  isOther,
  fieldId,
  validation,
}) => {
  const dispatch = useDispatch();
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const answer = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.answer as string[];

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    answer ?? []
  );
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");

  useEffect(() => {
    dispatch(
      answerFormField({ formFieldId: fieldId, answer: selectedOptions })
    );
  }, [dispatch, fieldId, selectedOptions]);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleOtherCheckboxChange = () => {
    setShowOther(!showOther);
    if (!showOther) {
      setSelectedOptions([...selectedOptions, otherText]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== otherText));
    }
  };

  const handleClearSelection = () => {
    setShowOther(false);
    setSelectedOptions([]);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex pb-4 w-full items-center">
          <input
            type="checkbox"
            name={`Checkboxes_${fieldId}}`}
            className="mr-4 w-5 h-5 cursor-pointer"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <p>{option}</p>
        </div>
      ))}
      {isOther && (
        <div className="flex items-center pb-2 w-full">
          <input
            type="checkbox"
            name={`Checkboxes_${fieldId}}`}
            className="mr-4 w-5 h-5 cursor-pointer"
            checked={showOther}
            onChange={handleOtherCheckboxChange}
          />
          <input
            type="text"
            className={`hover:border-b outline-none w-full bg-white focus:border-b-2 focus:border-red-500 text-gray-700 border-dotted`}
            placeholder="Other ..."
            onFocus={() => {
              setShowOther(true);
            }}
            onBlur={(e) => {
              const newOtherText = e.target.value;
              setOtherText(newOtherText);
              if (showOther) {
                // Replace the previous value in selectedOptions with the newOtherText
                setSelectedOptions([
                  ...selectedOptions.filter((item) => item !== otherText),
                  newOtherText,
                ]);
              }
            }}
          />
        </div>
      )}
      {selectedOptions.length > 0 && (
        <div className="flex justify-end items-center">
          <button
            className="text-sm p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        </div>
      )}

      {CheckboxesValidation({
        validation,
        selectedOptions,
        required,
      })}
    </div>
  );
};

export default Checkboxes;
