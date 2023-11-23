"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className=""
          />
          <span className="ml-1 text-xl">PYG Form</span>
        </Link>
        <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
            onClick={toggleUserDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Link href={"/"}>
              <Image
                className="w-8 h-8 rounded-full"
                src="/user.png"
                alt="user photo"
                height={32}
                width={32}
              />
            </Link>
          </button>

          {isUserDropdownOpen && (
            <div
              className="absolute right-0 top-6 z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border"
              ref={dropdownRef}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">
                  Bonnie Green
                </span>
                <span className="block text-sm  text-gray-500 truncate ">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <Link href={"/forms"}>
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                    My Forms
                  </p>
                </Link>

                <Link href={"/"}>
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                    Sign out
                  </p>
                </Link>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "></ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
