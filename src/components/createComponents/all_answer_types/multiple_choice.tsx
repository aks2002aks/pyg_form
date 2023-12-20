import React, { SetStateAction, useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOptionChange,
  handleOtherChange,
} from "../../../redux/features/formField/formFieldSlice";
import { RootState } from "@/redux/store/store";

interface Props {
  focus: boolean;
  index: number;
}

const Multiple_choice: React.FC<Props> = ({ focus, index }) => {
  const dispatch = useDispatch();
  const [showOther, setShowOther] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const options = useSelector(
    (state: RootState) => state.formField.formFields[index].options
  ) as string[];

  const handleOptionInputChange = (i: number, value: string) => {
    const newOptions = [...options];
    newOptions[i] = value;
    dispatch(handleOptionChange({ index, newOption: newOptions }));
  };

  const handleAddOption = () => {
    const NOption = "Option " + (options.length + 1);
    const newOptions = [...options, NOption];
    dispatch(handleOptionChange({ index, newOption: newOptions }));
  };

  const handleRemoveOption = (i: number) => {
    if (options.length === 1) {
      return; // Do not remove the last option
    }
    const newOptions = [...options];
    newOptions.splice(i, 1);
    dispatch(handleOptionChange({ index, newOption: newOptions }));
  };

  return (
    <div>
      {options.map((option, index) => {
        const isDuplicate = options.indexOf(option) !== index;
        const isLastOption = options.length === 1;
        return (
          <div key={index} className=" flex pb-4 w-full">
            <input
              type="radio"
              name="multiple_choice"
              className="mr-2"
              value={option}
              disabled
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionInputChange(index, e.target.value)}
              className={`hover:border-b outline-none w-full focus:border-b-2 ${
                isDuplicate ? "border-red-500" : ""
              }`}
            />
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative"
            >
              {isDuplicate && (
                <>
                  <div className="flex items-center text-red-500 ">
                    <BiError size={20} />
                  </div>
                  {isHovered && (
                    <div className="absolute top-6 -left-24 bg-gray-200 p-2 rounded-md text-xs w-[180px]">
                      Duplicate Value Not Allowed
                    </div>
                  )}
                </>
              )}
            </div>
            {!isLastOption && (
              <button
                onClick={() => handleRemoveOption(index)}
                className="px-4 flex items-center"
              >
                <IoCloseCircleOutline size={20} />
              </button>
            )}
          </div>
        );
      })}
      {showOther && (
        <div className="flex items-center pb-2">
          <input
            type="radio"
            name="multiple_choice"
            className="mr-2"
            disabled
          />
          <input
            type="text"
            placeholder="other ..."
            className="hover:border-b outline-none w-full bg-white focus:border-b-2 focus:border-red-500 text-gray-700 border-dotted"
            disabled
          />
          <div className=""></div>
          <button
            onClick={() => {
              setShowOther(false);
              dispatch(handleOtherChange({ index, newIsOther: false }));
            }}
            className="px-4 flex items-center"
          >
            <IoCloseCircleOutline size={20} />
          </button>
        </div>
      )}
      {focus && (
        <div className="flex items-center pt-2">
          <input
            type="radio"
            name="multiple_choice"
            className="mr-2"
            disabled
          />
          <div
            onClick={handleAddOption}
            className="hover:border-b outline-none w-auto pr-2 text-sm"
          >
            Add option
          </div>
          {!showOther && (
            <>
              <p className="text-sm"> OR </p>
              <button
                onClick={() => {
                  setShowOther(true);
                  dispatch(handleOtherChange({ index, newIsOther: true }));
                }}
                className=" outline-none w-auto pl-2 text-sm hover:bg-red-50 p-2 rounded-md"
              >
                Add &quot;Other&quot;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Multiple_choice;
