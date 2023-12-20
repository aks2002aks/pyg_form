import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface Validation {
  selectedOption: string;
  numberInput?: number;
  customErrorMessage?: string;
}

interface Props {
  validation?: Validation | null;
  textValue: string;
  required?: boolean;
}

const ShortAnswerAndParagraphValidation: React.FC<Props> = ({
  validation,
  textValue,
  required,
}) => {
  if (validation) {
    const { selectedOption, numberInput, customErrorMessage } = validation;
    const inputLength = textValue.length;
    switch (selectedOption) {
      case "greaterThan":
        if (inputLength <= (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length more than {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      case "greaterThanEqualTo":
        if (inputLength < (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length at least {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      case "lessThan":
        if (inputLength >= (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length fewer than {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      case "lessThanEqualTo":
        if (inputLength > (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length at most {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      case "equalTo":
        if (inputLength !== (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length should be exactly {numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      case "notEqualTo":
        if (inputLength === (numberInput ?? 0)) {
          return (
            <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
              <IoAlertCircleOutline size={20} />
              {!customErrorMessage ? (
                <span>Input String Length Not equal to{numberInput}</span>
              ) : (
                <span>{customErrorMessage}</span>
              )}
            </p>
          );
        } else {
          return <></>;
        }
      default:
        return <></>;
    }
  } else if (required && !textValue) {
    return (
      <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
        <IoAlertCircleOutline size={20} />
        <span>This field is required.</span>
      </p>
    );
  }

  return null;
};

export default ShortAnswerAndParagraphValidation;
