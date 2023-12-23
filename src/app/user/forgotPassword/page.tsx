"use client";

import React, { useState } from "react";
import ForgotPasswordFirst from "./first";
import ForgotPasswordSecond from "./second";
import ForgotPasswordThird from "./third";
import Steps from "./steps";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (value: string) => {
    setInputValue(value);
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setInputValue("");
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleNext = () => {
    if (step === 1 && inputValue !== "") {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  return (
    <>
      <Steps step={step} />
      {step === 1 && (
        <ForgotPasswordFirst
          handleInput={handleInput}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <ForgotPasswordSecond
          inputValue={inputValue}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 3 && <ForgotPasswordThird inputValue={inputValue} />}
    </>
  );
};

export default ForgotPassword;
