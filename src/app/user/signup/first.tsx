"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FirstSignupProps {
  isVendorClicked: boolean;
  setIsVendorClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCustomerClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isCustomerClicked: boolean;
  setGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  goback: boolean;
}

const FirstSignup = ({
  isVendorClicked,
  isCustomerClicked,
  setIsVendorClicked,
  setIsCustomerClicked,
  setGoBack,
  goback,
}: FirstSignupProps) => {
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleVendorClick = () => {
    setIsVendorClicked(true);
    setIsCustomerClicked(false);
  };
  const handleCustomerClick = () => {
    setIsCustomerClicked(true);
    setIsVendorClicked(false);
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const cardVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <div className="text-2xl pt-5">
        <motion.h1
          className="text-center font-bold text-4xl mb-2"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/">
            <button className="rounded-full bg-gray-200 p-2 mr-4">
              <FiArrowLeft size={24} />
            </button>
          </Link>
          WELCOME TO PLAN YOUR GATHERING
        </motion.h1>
        <motion.h3
          className="text-center font-bold text-2xl mb-2"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          YOU ARE A ?
        </motion.h3>

        {isError && (
          <motion.h3
            className="text-center text-red-600 font-bold text-xl mb-2 flex item-center justify-center"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <FaExclamationTriangle size={30} className="pt-2" />
            <p className="p-2">{message}</p>
          </motion.h3>
        )}
      </div>

      <div className="flex md:flex-row flex-col justify-center pb-5  items-center ">
        <motion.div
          className="max-w-xs rounded overflow-hidden shadow-lg border-t-2 m-5"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onAnimationStart={() => {
            if (!isVendorClicked && !isCustomerClicked) {
              return { animation: "shake 0.5s ease-in-out" };
            }
          }}
        >
          <Image
            className="w-full"
            src="/client.svg"
            alt="Client or Customer"
            width={400}
            height={400}
          />
          <div className="px-6 py-1 text-center">
            <div className="font-bold text-xl mb-2">CLIENT OR CUSTOMER</div>
          </div>
          <div className="px-6 pt-1 pb-2 flex items-center justify-center">
            <button
              className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={handleCustomerClick}
            >
              {isCustomerClicked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500 flex items-center justify-center"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M5 10.75L8 13.75L15 6.75"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="max-w-xs rounded overflow-hidden shadow-lg border-t-2 m-5 "
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          onAnimationStart={() => {
            if (!isVendorClicked && !isCustomerClicked) {
              return { animation: "shake 0.5s ease-in-out" };
            }
          }}
        >
          <Image
            className="w-full"
            src="/vendor.svg"
            alt="Client or Customer"
            width={380}
            height={380}
          />
          <div className="px-6 py-1 text-center">
            <div className="font-bold text-xl mb-2">VENDOR</div>
          </div>
          <div className="px-6 pt-1 pb-2 flex items-center justify-center">
            <button
              className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={handleVendorClick}
            >
              {isVendorClicked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500 flex items-center justify-center"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M5 10.75L8 13.75L15 6.75"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded flex"
          onClick={() => {
            setGoBack(false);
          }}
        >
          <p className="px-1">NEXT</p>
          <FiArrowRight size={24} />
        </button>
      </div>
      <div className="flex items-center justify-center pb-3">
        <div>
          <p className="text-center pt-5">
            Already have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-700"
              href="/user/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstSignup;
