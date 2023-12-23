"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/common/loader";

const LoginPage = () => {
  const router = useRouter();
  const param = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (
      !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      !email.match(/^\+91\d{10}$/)
    ) {
      setEmailError(true);
      setEmailErrorMessage(
        "Please enter a valid email or phone number : +91-XX-XXXX-XXXX"
      );
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
      setEmail(email.toLowerCase());
    }

    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const callbackUrl = !(param.get("callbackUrl") as string)
      ? "/forms"
      : decodeURI(param.get("callbackUrl") as string);;
    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        const result = await signIn("credentials", {
          emailOrPhone: email,
          password,
          redirect: false,
          callbackUrl: callbackUrl ?? "/forms",
        });

        if (result?.ok) {
          router.push(callbackUrl);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          setLoading(false);
          toast.error("" + result?.error);
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while sending the request : " + error);
      }
    } else {
      setLoading(false);
      toast.error("Validation error occurred");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white container mx-auto md:py-20 py-10">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:block hidden bg-cover max-w-md  justify-center">
            <Image
              src={"/login.svg"}
              alt="Login Image"
              width={500}
              height={500}
            />
          </div>

          <div className="flex items-center w-full  px-6 max-w-lg   bg-white pt-8 pb-4 lg:pt-0">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-2">
                  <h1 className="text-center font-bold text-xl ">
                    Welcome Back
                  </h1>
                </div>
                <div className="flex justify-center mx-auto">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="mr-4"
                  />
                </div>

                <p className="mt-3 text-gray-500 ">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Email Address or Phone Number
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="example@example.com or +91-XX-XXXX-XXXX"
                      value={email}
                      onChange={handleEmailChange}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-500">
                        {emailErrorMessage}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet ?{" "}
                  <Link
                    href={"/user/signup"}
                    className="text-red-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="flex items-center justify-center mt-6">
                  <div className="border-b border-gray-400 w-full mr-4"></div>
                  <div className="text-sm text-center text-gray-400">or</div>
                  <div className="border-b border-gray-400 w-full ml-4"></div>
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Have Trouble Signing in ?{" "}
                  <Link
                    href={"/user/forgotPassword"}
                    className="text-red-500 focus:outline-none focus:underline hover:underline"
                  >
                    Forgot Password
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

export default LoginPage;
