"use client";

import React  from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";


const SingupPage = () => {
  const router = useRouter();
 
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
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

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
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
      setPhoneNumberErrorMessage(
        "Invalid phone number format : +91-XX-XXXX-XXXX"
      );
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formIsValid = validateForm();

    try {
      if (formIsValid) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              phone: phoneNumber,
              email,
              password,
            }),
          }
        );

        if (response.ok) {
          setLoginSuccess(true);
          setTimeout(() => {
            router.push("/user/login");
          }, 1000);
        } else {
          const res = await response.json();

          if (res.success) {
            setLoading(false);
            toast.success(res.message);
          } else {
            setLoading(false);
            toast.error(res.message);
          }
        }
      } else {
        setLoading(false);
        toast.error("Validation error occurred");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong : " + error);
    }
  };

  const variants = {
    initial: { rotate: 0 },
    complete: { rotate: 360 },
  };
  return (
    <>
      {loading && (
        <div className="">
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="w-64 h-64 rounded-full flex items-center justify-center">
              {loginSuccess ? (
                <AnimatePresence>
                  {loginSuccess && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="green"
                      className="CheckIcon h-16 w-16"
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ pathLength: 0 }}
                        transition={{
                          type: "tween",
                          duration: 0.3,
                          ease: loginSuccess ? "easeOut" : "easeIn",
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </AnimatePresence>
              ) : (
                <motion.div
                  className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
                  variants={variants}
                  initial="initial"
                  animate="complete"
                  transition={{ duration: 1, repeat: Infinity }}
                ></motion.div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-white container mx-auto md:py-20 py-10">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:block hidden bg-cover max-w-md  justify-center">
            <Image
              src={"/signup.svg"}
              alt="Login Image"
              width={500}
              height={500}
            />
          </div>

          <div className="flex items-center w-full  px-6 max-w-lg   bg-white pt-8 pb-4 lg:pt-0">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mr-4"
                  />
                </div>

                <p className="mt-4 text-gray-500 ">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>
              </div>

              <div className="mt-8">
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
                        type={showCPassword ? "text" : "password"}
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
                        onClick={toggleShowCPassword}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                      >
                        {showCPassword ? (
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

                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have Account ?{" "}
                  <Link
                    href={"/user/login"}
                    className="text-red-500 focus:outline-none focus:underline hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingupPage;
