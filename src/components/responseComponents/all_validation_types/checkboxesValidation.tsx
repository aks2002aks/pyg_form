import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface Validation {
  selectedOption: string;
  numberInput: number;
  customErrorMessage?: string;
}

interface Props {
  validation?: Validation | null;
  selectedOptions: string[];
  required?: boolean;
}

const CheckboxesValidation: React.FC<Props> = ({
  validation,
  selectedOptions,
  required,
}) => {
  if (validation) {
    const { selectedOption, numberInput, customErrorMessage } = validation;

    switch (selectedOption) {
      case "atLeast":
        if (selectedOptions.length < numberInput) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Select At Least {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } 
        break;
      case "atMost":
        if (selectedOptions.length > numberInput) {

          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Select At Most {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        }
        break;
      case "exactly":
        if (selectedOptions.length !== numberInput) {

          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Select Exactly {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        }
        break;
      default:
        break;
    }
  } else if (
    required &&
    (selectedOptions.length === 0 || selectedOptions.includes(""))
  ) {
    return (
      <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
        <IoAlertCircleOutline size={20} />
        <span>This field is required.</span>
      </p>
    );
  } 

  return null;
};

export default CheckboxesValidation;
