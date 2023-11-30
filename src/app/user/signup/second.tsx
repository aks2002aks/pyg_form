"use client";

import React from "react";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface SecondSignupProps {
  userType: string;
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  goback: boolean;
}

const SecondSignup = ({ userType, setGoBack, goback }: SecondSignupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateConfirmPassword = () => {};

  const validateForm = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameErrorMessage("First name is required");
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameErrorMessage("");
      setFirstNameError(false);
    }

    if (!lastName) {
      setLastNameErrorMessage("Last name is required");
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameErrorMessage("");
      setLastNameError(false);
    }

    if (!phoneNumber) {
      setPhoneNumberErrorMessage("Phone number is required");
      setPhoneNumberError(true);
      isValid = false;
    } else if (!/^\+\d{2}\d{10}$/.test(phoneNumber)) {
      setPhoneNumberErrorMessage("Invalid phone number format");
      setPhoneNumberError(true);
      isValid = false;
    } else {
      setPhoneNumberErrorMessage("");
      setPhoneNumberError(false);
    }

    if (!email) {
      setEmailErrorMessage("Email address is required");
      setEmailError(true);
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailErrorMessage("Invalid email address");
      setEmailError(true);
      isValid = false;
    } else {
      setEmailErrorMessage("");
      setEmailError(false);
    }

    if (!password) {
      setPasswordErrorMessage("Password is required");
      setPasswordError(true);
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      setPasswordErrorMessage(
        "Password must be at least 8 characters long and at most 20 characters long"
      );
      setPasswordError(true);
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password
      )
    ) {
      setPasswordErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      );
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordErrorMessage("");
      setPasswordError(false);
    }

    if (!confirmPassword.length) {
      setConfirmPasswordErrorMessage("Confirm password is required");
      setConfirmPasswordError(true);
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordErrorMessage("Passwords do not match");
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordErrorMessage("");
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      console.log(
        JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          confirmPassword,
        })
      );
    } else {
      console.log("Validation error occurred");
    }
  };

  return (
    <div>
      <section className="bg-white ">
        <div className="flex justify-center min-h-screen flex-col lg:flex-row">
          <motion.div
            className="flex bg-cover  lg:w-2/5 z-1 h-[40vh] md:h-[50vh] lg:h-screen"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/pw/ADCreHcXQ2o7yD5eArSi2veeASKpwuNjWlAFnUViS8BiEpgdmJeJ12rKpU8jYCQvr36PJ9NwORQiELHmxI2Lt5vsVzpkoblKXsTLqxSRjp2RkBrjA9iw5Q94Pv0Ssr67CgKEH7pvdfRpD_keUbv0ru0ODY0AZw=w1808-h1205-s-no-gm?authuser=0')",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
            }}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
          ></motion.div>

          <div className="flex items-center w-full  p-8 mx-auto lg:px-12 lg:w-3/5 bg-white z-10">
            <div className="w-full">
              <motion.div
                className="flex items-start  pt-2"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="rounded-full bg-gray-200 p-2 mr-4"
                  onClick={() => {
                    setGoBack(true);
                  }}
                >
                  <FiArrowLeft size={24} />
                </button>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="mr-4"
                />
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize pt-2">
                  PLAN YOUR GATHERING
                </h1>
              </motion.div>

              <p className="mt-4 text-gray-500 ">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <div className="mt-6">
                <h1 className="text-gray-500 font-bold">
                  Creating account for - {userType}
                </h1>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              >
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    First Name
                  </label>

                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                      firstNameError ? "border-red-500" : "border-gray-200"
                    } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  />
                  {firstNameError && (
                    <p className="mt-2 text-sm text-red-500">
                      {firstNameErrorMessage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Snow"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                      lastNameError ? "border-red-500" : "border-gray-200"
                    } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  />
                  {lastNameError && (
                    <p className="mt-2 text-sm text-red-500">
                      {lastNameErrorMessage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Phone number
                  </label>
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="+91-XX-XXXX-XXXX"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                      phoneNumberError ? "border-red-500" : "border-gray-200"
                    } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  />
                  {phoneNumberError && (
                    <p className="mt-2 text-sm text-red-500">
                      {phoneNumberErrorMessage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="johnsnow@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                      emailError ? "border-red-500" : "border-gray-200"
                    } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-500">
                      {emailErrorMessage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                        passwordError ? "border-red-500" : "border-gray-200"
                      } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-500">
                      {passwordErrorMessage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      onBlur={validateConfirmPassword}
                      className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${
                        confirmPasswordError
                          ? "border-red-500"
                          : "border-gray-200"
                      } rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p className="mt-2 text-sm text-red-500">
                      {confirmPasswordErrorMessage}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-center col-span-1 md:col-span-2">
                  <button className="flex items-center px-6 py-3 text-sm tracking-wide capitalize transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-opacity-50">
                    <span>Sign Up </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondSignup;
