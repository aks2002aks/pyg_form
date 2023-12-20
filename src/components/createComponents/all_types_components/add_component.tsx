import React, { useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  addInternalTitleField,
  addNewQuestionField,
} from "@/redux/features/formField/formFieldSlice";
import { useDispatch } from "react-redux";
import { TbTextSize } from "react-icons/tb";

interface Props {}

const AddComponent: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row  bg-white p-2 rounded-t-xl lg:rounded-xl justify-center items-center shadow-xl border fixed bottom-0 left-0 right-0 z-10 lg:flex-col lg:justify-around lg:items-center lg:static lg:border cursor-pointer space-x-4 lg:space-y-4 lg:space-x-0">
      <div
        className="text-center hover:bg-slate-400 p-2 rounded-full bg-gray-200"
        onClick={() => {
          dispatch(
            addNewQuestionField({
              type: "Multiple choice",
              label: "<p>Question</p>",
              options: ["Option 1", "Option 2"],
              required: false,
              focus: true,
            })
          );
        }}
      >
        <IoMdAddCircleOutline size={20} />
      </div>
      <div
        className="text-center hover:bg-slate-400 p-2 rounded-full bg-gray-200"
        onClick={() => {
          dispatch(
            addInternalTitleField({
              type: "Internal Title and Description",
              label: "<p>Internal Untitled</p>",
              description: "<p>Internal Description</p>",
              required: false,
              focus: true,
            })
          );
        }}
      >
        <TbTextSize size={20} />
      </div>
      {/* Add more navigation items as needed */}
    </div>
  );
};

export default AddComponent;
