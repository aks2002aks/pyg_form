"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
  handleDescriptionChange,
  handleLabelChange,
} from "@/redux/features/formField/formFieldSlice";
import Editor from "../editorToolbar/Editor";

interface Props {
  input_label: string;
  placeholder_text: string;
  text_size: string;
  focus: boolean;
  type: string;
  index: number;
  label: string;
}

const QuestionInput: React.FC<Props> = ({
  placeholder_text,
  input_label,
  text_size,
  focus,
  type,
  index,
  label,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (content: string) => {
    if (type === "text") {
      dispatch(handleLabelChange({ index, newLabel: content }));
    } else if (type === "description") {
      dispatch(handleDescriptionChange({ index, newDescription: content }));
    }
  };

  return (
    <div>
      <Editor
        placeholder_text={placeholder_text}
        input_label={input_label}
        text_size={text_size}
        label={label}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default QuestionInput;
