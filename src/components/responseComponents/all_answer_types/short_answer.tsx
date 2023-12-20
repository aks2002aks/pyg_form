import { answerFormField } from "@/redux/features/responseField/responseFieldSlice";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ShortAnswerAndParagraphValidation from "../all_validation_types/shortAnswerAndParagraphValidation";
import { RootState } from "@/redux/store/store";

interface Props {
  required: boolean;
  fieldId: string;
  validation: any;
}

const Short_answer: React.FC<Props> = ({ required, fieldId, validation }) => {
  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const answer = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.answer as string;
  
  const [text, setText] = useState(answer ?? "");
  const dispatch = useDispatch();

  const handleBlur = () => {
    dispatch(
      answerFormField({
        formFieldId: fieldId,
        answer: text,
      })
    );
  };

  const handleClearSelection = () => {
    setText("");
    dispatch(
      answerFormField({
        formFieldId: fieldId,
        answer: "",
      })
    );
  };

  return (
    <div className="">
      <input
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:bg-white bg-gray-50"
        placeholder="Short Question Answer..."
        name={`Short_answer_${fieldId}}`}
        required={required}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onBlur={handleBlur}
      />

      {text && (
        <div className="flex justify-end items-center mt-3">
          <button
            className="text-sm p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        </div>
      )}
      {ShortAnswerAndParagraphValidation({
        validation,
        textValue: text,
        required,
      })}
    </div>
  );
};

export default Short_answer;
