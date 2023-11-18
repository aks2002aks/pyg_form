import Image from "next/image";
import React from "react";
import { FaRegEye } from "react-icons/fa";

const Create_edit_navbar = () => {
  return (
    <header className="text-gray-600 body-font border-y-2">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center">
        <button className="m-2 inline-flex items-center bg-gray-100 border-2  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
          <FaRegEye />
          <p className="ml-1">Preview</p>
        </button>
        <button className="m-2 inline-flex items-center bg-gray-100 border-2  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
          Responses
        </button>
        <button className="m-2 inline-flex items-center bg-gray-100 border-2  py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
          Publish
        </button>
      </div>
    </header>
  );
};

export default Create_edit_navbar;
