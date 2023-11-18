import React, { useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { addNewQuestionField } from "@/redux/features/formField/formFieldSlice";
import { useDispatch } from "react-redux";

interface Props {
  focusFields: boolean[];
  setFocusFields: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const AddComponent: React.FC<Props> = ({ focusFields, setFocusFields }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-white p-2 rounded-t-xl lg:rounded-xl justify-center items-center shadow-xl border fixed bottom-0 left-0 right-0 z-10 lg:flex-row lg:justify-around lg:items-center lg:static lg:border cursor-pointer">
      <div
        className="text-center hover:bg-slate-100 p-1 rounded-lg"
        onClick={() => {
          const focusedIndex = focusFields.findIndex((f) => f);
          dispatch(
            addNewQuestionField({
              type: "Multiple choice",
              label: "",
              options: ["Option 1", "Option 2"],
              focusedIndex: focusedIndex,
              required: false,
            })
          );
          const newFocusFields = [
            ...focusFields.slice(0, focusedIndex),
            false,
            true,
            ...focusFields.slice(focusedIndex + 1),
          ];

          setFocusFields(newFocusFields);
        }}
      >
        <IoMdAddCircleOutline size={20} />
      </div>
      {/* Add more navigation items as needed */}
    </div>
  );
};

export default AddComponent;
