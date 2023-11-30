"use client";
import React, { useState } from "react";

interface FirstProps {
  handleInput: (value: string) => void;
  handleNext: () => void;
}

const First = ({ handleInput }: FirstProps) => {
  const [inputType, setInputType] = useState("email");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById("input") as HTMLInputElement;
    const isValid =
      inputType === "phone"
        ? isValidPhoneNumber(input.value)
        : isValidEmail(input.value);
    if (isValid) {
      handleInput(input.value);
    } else {
      setErrorMessage("Invalid input");
    }
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+\d{2}\d{10}$/;
    return phoneRegex.test(phoneNumber);
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      {" "}
      <div>
        <section className="bg-white">
          <div className="max-w-3xl px-6 py-8 mx-auto text-center">
            <h1 className="text-3xl font-semibold text-gray-800 ">
              Having Trouble Logging In ?
            </h1>
            <p className="max-w-md mx-auto mt-5 text-gray-500 ">
              Dont worry we are there to recover your account back. Please
              follow the process below to recover your account.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:justify-center sm:-mx-2">
                <div className="flex flex-row items-center justify-center space-x-4 pb-4">
                  <div className="flex ">
                    <input
                      id="phone"
                      type="radio"
                      value="phone"
                      checked={inputType === "phone"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="phone">Phone Number</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="email"
                      type="radio"
                      value="email"
                      checked={inputType === "email"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                <div className="space-y-4">
                  
                  <input
                    id="input"
                    type={inputType === "phone" ? "tel" : "email"}
                    className="px-2 py-2 text-gray-700 bg-white border rounded-md sm:mx-2  focus:border-red-400  focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
                    placeholder={
                      inputType === "phone" ? "Phone Number" : "Email Address"
                    }
                    required
                  />
                  
                  <div className="text-red-500 text-sm font-medium text-center h-[10px]">
                    <p>{errorMessage}</p>
                  </div>
                  <button className="m-2 sm:m-0 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:mx-2 hover:bg-red-600 focus:outline-none focus:bg-red-600">
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default First;
