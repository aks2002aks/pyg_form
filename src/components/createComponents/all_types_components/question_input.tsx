"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";
import { motion } from "framer-motion";
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
  label: string | undefined;
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
  const [text, setText] = useState(label);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (type === "text") {
      dispatch(handleLabelChange({ index, newLabel: event.target.value }));
    } else if (type === "description") {
      dispatch(
        handleDescriptionChange({ index, newDescription: event.target.value })
      );
    }
  };

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        setShowButtons(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [parentRef]);

  return (
    <div
    // className="flex flex-col items-start space-y-2"
    //  ref={parentRef}
    >
      {/* <textarea
        ref={textAreaRef}
        id={input_label}
        name={input_label}
        className={`w-full text-black  focus:outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2 break-words resize-none overflow-hidden leading-none p-3 ${
          isBold ? "font-bold" : ""
        } ${isItalic ? "italic" : ""} ${isUnderline ? "underline" : ""}  ${
          focus ? "border-b-2" : ""
        }`}
        rows={1}
        placeholder={placeholder_text}
        onChange={handleInputChange}
        value={text}
        autoFocus={focus}
        onClick={() => setShowButtons(true)}
        style={{ fontSize: `${text_size}px` }}
      />
      {showButtons && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : -10 }}
          transition={{ duration: 0.5 }}
        >
          <div className="" onClick={handleBoldClick}>
            <BiBold
              className={`text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in  ${
                isBold ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
              size={40}
            />
          </div>
          <div className="" onClick={handleItalicClick}>
            <BiItalic
              className={`text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in   ${
                isItalic ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
              size={40}
            />
          </div>
          <div className="" onClick={handleUnderlineClick}>
            <BiUnderline
              className={`text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in   ${
                isUnderline ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
              size={40}
            />
          </div>
        </motion.div>
      )} */}
      <Editor />
    </div>
  );
};

export default QuestionInput;
