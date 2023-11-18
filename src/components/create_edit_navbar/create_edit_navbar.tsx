import Image from "next/image";
import React from "react";
import { FaRegEye } from "react-icons/fa";

const Create_edit_navbar = () => {
  return (
    <header className="text-gray-600 body-font border-b-2">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className=""
          />
          <span className="ml-1 text-xl">PYG Form</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav>
        <button className="m-2 inline-flex items-center bg-gray-100 border-2  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
          <FaRegEye />
          <p className="ml-1">Preview</p>
          
        </button>
        <button className="m-2 inline-flex items-center bg-red-500 border-2 border-red-500 text-white py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
          Publish
        </button>
      </div>
    </header>
  );
};

export default Create_edit_navbar;
