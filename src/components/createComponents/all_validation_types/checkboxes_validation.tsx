import { handleValidationChange } from "@/redux/features/formField/formFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  showValidation: boolean;
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  options: string[];
}

const CheckboxesValidation: React.FC<Props> = ({
  setShowValidation,
  index,
  showValidation,
  options,
}) => {
  const dispatch = useDispatch();
  const validation = useSelector(
    (state: RootState) => state.formField.formFields[index].validation
  );
  const [selectedOption, setSelectedOption] = useState(
    validation?.selectedOption ?? "atLeast"
  );
  const [numberInput, setNumberInput] = useState(validation?.numberInput ?? 0);
  const [customErrorMessage, setCustomErrorMessage] = useState(
    validation?.customErrorMessage ?? ""
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
    <>
      <div className="flex flex-wrap space-y-6 sm:flex-nowrap text-xs justify-center items-center space-x-4 p-5">
        <select
          id="option-select"
          value={selectedOption}
          onChange={handleOptionChange}
          className="p-2 outline-none"
        >
          <option value="atLeast">Select at least</option>
          <option value="atMost">Select at most</option>
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
            dispatch(handleValidationChange({ index, newValidation: null }));
            setShowValidation(false);
          }}
          className="justify-center items-center flex text-red-500"
        >
          <IoCloseCircleOutline size={20} />
        </button>
      </div>

      <div className="">
        {!(numberInput <= options.length) && (
          <p className="text-red-500 text-sm mt-4  pt-2  flex space-x-2 items-center">
            <IoAlertCircleOutline size={20} />
            <span>This validation number can not be greater than options</span>
          </p>
        )}
      </div>
    </>
  );
};

export default CheckboxesValidation;
