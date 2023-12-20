"use client";

import React, { useState, useEffect, useRef, SetStateAction } from "react";

import { MdOutlineShortText } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import { CiSquareCheck } from "react-icons/ci";
import { BiSolidCloudUpload } from "react-icons/bi";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { handleTypeChange } from "@/redux/features/formField/formFieldSlice";
import { PiSlidersHorizontal } from "react-icons/pi";

interface Props {
  selectedValue: string;
  setSelectedValue: React.Dispatch<SetStateAction<string>>;
  index: number;
}

const Question_type: React.FC<Props> = ({
  selectedValue,
  setSelectedValue,
  index,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    dispatch(handleTypeChange({ index, newType: value }));
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <div className="relative max-w-xs z-20">
        <div
          className="flex items-center justify-between w-full border rounded-md shadow-sm text-sm"
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center flex-1 py-2 pl-3">
            {selectedValue === "Short answer" && (
              <MdOutlineShortText className="mr-2" />
            )}
            {selectedValue === "Paragraph" && (
              <GrTextAlignFull className="mr-2" />
            )}
            {selectedValue === "Multiple choice" && (
              <FaRegCircleDot className="mr-2" />
            )}
            {selectedValue === "Drop-down" && (
              <IoCaretDownCircleOutline className="mr-2" />
            )}
            {selectedValue === "Checkboxes" && (
              <CiSquareCheck className="mr-2" />
            )}
            {selectedValue === "Range" && (
              <PiSlidersHorizontal className="mr-2" />
            )}
            {selectedValue === "File upload" && (
              <BiSolidCloudUpload className="mr-2" />
            )}
            {selectedValue === "Date" && <BsCalendar2Date className="mr-2" />}
            {selectedValue === "Time" && (
              <MdOutlineAccessTime className="mr-2" />
            )}

            <span>{selectedValue || "Select a option"}</span>
          </div>
          <div className="flex-shrink-0 pr-2">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 7L10 10L13 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {isOpen && (
          <motion.div
            className={`absolute z-10 w-full mt-1 bg-white rounded-md  top-7 shadow-2xl`}
            initial="closed"
            animate="open"
            variants={{
              open: { opacity: 1, y: 10 },
              closed: { opacity: 0, y: -10 },
            }}
            transition={{ duration: 0.5 }}
          >
            <ul className="py-1">
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Short answer")}
              >
                <MdOutlineShortText className="mr-2" />
                <span>Short answer</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Paragraph")}
              >
                <GrTextAlignFull className="mr-2" />
                <span>Paragraph</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Multiple choice")}
              >
                <FaRegCircleDot className="mr-2" />
                <span>Multiple choice</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Drop-down")}
              >
                <IoCaretDownCircleOutline className="mr-2" />
                <span>Drop-down</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Checkboxes")}
              >
                <CiSquareCheck className="mr-2" />
                <span>Checkboxes</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Range")}
              >
                <PiSlidersHorizontal className="mr-2" />
                <span>Range</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("File upload")}
              >
                <BiSolidCloudUpload className="mr-2" />
                <span>File upload</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Date")}
              >
                <BsCalendar2Date className="mr-2" />
                <span>Date</span>
              </li>
              <li
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick("Time")}
              >
                <MdOutlineAccessTime className="mr-2" />
                <span>Time</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Question_type;
