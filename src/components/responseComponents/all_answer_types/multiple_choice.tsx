import { answerFormField } from "@/redux/features/responseField/responseFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  options: string[];
  required: boolean;
  isOther: boolean;
  fieldId: string;
}

const Multiple_choice: React.FC<Props> = ({
  options,
  required,
  isOther,
  fieldId,
}) => {
  const dispatch = useDispatch();

  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );
  const answer = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.answer as string;
  
  const [selectedOption, setSelectedOption] = useState<string>(answer ?? "");
  const [showOther, setShowOther] = useState(false);
  const [othertext, setOthertext] = useState("");

  useEffect(() => {
    dispatch(
      answerFormField({
        formFieldId: fieldId,
        answer: selectedOption,
      })
    );
  }, [dispatch, fieldId, selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleClearSelection = () => {
    setShowOther(false);
    setSelectedOption("");
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex pb-4 w-full items-center">
          <input
            type="radio"
            name={`multiple_choice_${fieldId}}`}
            className="mr-4 w-5 h-5 cursor-pointer"
            value={option}
            required={required}
            checked={option == selectedOption}
            onChange={() => {
              setShowOther(false);
              handleOptionClick(option);
            }}
          />
          <p>{option}</p>
        </div>
      ))}
      {isOther && (
        <div className="flex items-center pb-2">
          <input
            type="radio"
            name={`multiple_choice_${fieldId}}`}
            className="mr-4 w-5 h-5 cursor-pointer"
            value={othertext}
            checked={showOther}
            required={required}
            onChange={() => {
              setShowOther(true);
              handleOptionClick(othertext);
            }}
          />
          <input
            type="text"
            className="hover:border-b outline-none w-full bg-white focus:border-b-2 focus:border-red-500 text-gray-700 border-dotted"
            placeholder="Other ..."
            onBlur={(e) => {
              setOthertext(e.target.value);
              handleOptionClick(e.target.value);
            }}
            onFocus={() => {
              setShowOther(true);
            }}
          />
        </div>
      )}
      {selectedOption && (
        <div className="flex justify-end items-center ">
          <button
            className="text-sm p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        </div>
      )}
      {required && !selectedOption && (
        <p className="text-red-500 text-sm mt-4  pt-2  flex space-x-2 items-center">
          <IoAlertCircleOutline size={20} />
          <span>This field is required.</span>
        </p>
      )}
    </div>
  );
};

export default Multiple_choice;
