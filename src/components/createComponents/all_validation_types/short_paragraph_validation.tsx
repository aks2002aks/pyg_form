import { handleValidationChange } from "@/redux/features/formField/formFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  showValidation: boolean;
}

const ShortParagraphValidation: React.FC<Props> = ({
  setShowValidation,
  index,
  showValidation,
}) => {
  const dispatch = useDispatch();
  const validation = useSelector(
    (state: RootState) => state.formField.formFields[index].validation
  );
  const [selectedOption, setSelectedOption] = useState(
    validation?.selectedOption
  );
  const [numberInput, setNumberInput] = useState(validation?.numberInput);
  const [customErrorMessage, setCustomErrorMessage] = useState(
    validation?.customErrorMessage
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberInput(parseInt(event.target.value));
  };

  const handleCustomErrorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomErrorMessage(event.target.value);
  };

  useEffect(() => {
    const handleSubmit = () => {
      const newValidation: any = {
        selectedOption,
        numberInput,
        customErrorMessage,
      };
      dispatch(handleValidationChange({ index, newValidation: newValidation }));
    };
    handleSubmit();
  }, [customErrorMessage, dispatch, index, numberInput, selectedOption]);

  return (
    <div className="flex flex-wrap space-y-6 sm:flex-nowrap text-xs justify-center items-center space-x-4 p-5">
      <select
        id="option-select"
        value={selectedOption}
        onChange={handleOptionChange}
        className="p-2 outline-none"
      >
        <option value="greaterThan">Greater than</option>
        <option value="greaterThanEqualTo">Greater than or equal to</option>
        <option value="lessThan">Less than</option>
        <option value="lessThanEqualTo">Less than or equal to</option>
        <option value="equalTo">Equal to</option>
        <option value="notEqualTo">Not equal to</option>
      </select>
      <br />
      <input
        type="number"
        id="number-input"
        placeholder="Number"
        value={numberInput}
        onChange={handleNumberInputChange}
        className="border-b outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2   "
      />
      <br />
      <input
        type="text"
        id="custom-error"
        placeholder="Custom error message"
        value={customErrorMessage}
        onChange={handleCustomErrorChange}
        className="w-full border-b outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2   "
      />
      <br />

      <button
        onClick={() => {
          setShowValidation(false);
        }}
        className="justify-center items-center flex text-red-500"
      >
        <IoCloseCircleOutline size={20} />
      </button>
    </div>
  );
};

export default ShortParagraphValidation;
