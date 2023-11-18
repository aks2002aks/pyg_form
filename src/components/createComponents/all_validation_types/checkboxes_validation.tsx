import { handleValidationChange } from "@/redux/features/formField/formFieldSlice";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface Props {
  showValidation: boolean;
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

const CheckboxesValidation: React.FC<Props> = ({
  setShowValidation,
  index,
  showValidation,
}) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("atLeast");
  const [numberInput, setNumberInput] = useState(0);
  const [customErrorMessage, setCustomErrorMessage] = useState("");

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
        <option value="atLeast">Select at least</option>
        <option value="ataMost">Select at most</option>
        <option value="exactly">Select exactly </option>
      </select>
      <br />
      <input
        type="number"
        id="number-input"
        placeholder="Number"
        value={numberInput}
        onChange={handleNumberInputChange}
        className="border-b outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2"
      />
      <br />
      <input
        type="text"
        id="custom-error"
        placeholder="Custom error message"
        value={customErrorMessage}
        onChange={handleCustomErrorChange}
        className="w-full border-b outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2"
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

export default CheckboxesValidation;
