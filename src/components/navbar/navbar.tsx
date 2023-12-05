"use client";

import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const logout = async () => {
    setIsUserDropdownOpen(false);
    signOut();
    router.push("/");
  };

  useEffect(() => {
    if (status === "authenticated") {
      setLoggedIn(true);
    }
  }, [status]);

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
          <span className="ml-1 text-xl font-extrabold">PYG FORMS</span>
        </Link>
        <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
            onClick={toggleUserDropdown}
          >
            <span className="sr-only">Open user menu</span>

            <Image
              className="w-8 h-8 rounded-full"
              src="/user.png"
              alt="user photo"
              height={32}
              width={32}
            />
          </button>

          {isUserDropdownOpen && (
            <div
              className="absolute right-0 top-6 z-50  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border"
              ref={dropdownRef}
            >
              {loggedIn && (
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">
                    {session?.user?.firstName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate ">
                    {session?.user?.email}
                  </span>
                </div>
              )}
              <ul className="py-2" aria-labelledby="user-menu-button">
                {loggedIn && (
                  <>
                    <Link
                      href={"/forms"}
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                      }}
                    >
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                        My Forms
                      </p>
                    </Link>
                    <Link
                      href={"/profile"}
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                      }}
                    >
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                        Profile
                      </p>
                    </Link>
                    <div onClick={logout}>
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                        Sign out
                      </p>
                    </div>
                  </>
                )}

                {!loggedIn && (
                  <Link
                    href={"/user/login"}
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                      Login
                    </p>
                  </Link>
                )}
              </ul>
            </div>
          )}
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
