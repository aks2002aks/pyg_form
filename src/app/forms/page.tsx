"use client";

import React from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const forms = [
  {
    _id: "5fc5bf01f25eeea23c5fe6d5",
    formFields: [
      {
        type: "Title and description",
        id: "some-unique-id-1",
        label: "My First Form",
        required: false,
        focus: false,
      },
      {
        type: "Multiple choice",
        id: "some-unique-id-2",
        label: "Select your favorite color",
        options: ["Red", "Blue", "Green"],
        required: true,
        focus: true,
      },
      {
        type: "Short answer",
        id: "some-unique-id-3",
        label: "What is your name?",
        required: true,
        focus: false,
      },
      {
        type: "Dropdown",
        id: "some-unique-id-7",
        label: "Select your country",
        options: ["USA", "Canada", "UK", "Other"],
        required: false,
        focus: false,
      },
      {
        type: "Date",
        id: "some-unique-id-8",
        label: "Select your birthdate",
        required: false,
        focus: false,
      },
    ],
    userId: "12345678",
    user: "Ashwani",
    lastModified: "2023-11-23T00:00:00Z",
  },
  {
    _id: "5fc5bf01f25eeea23c5fe6d6",
    formFields: [
      {
        type: "Title and description",
        id: "some-unique-id-4",
        label: "My Second Form",
        required: false,
        focus: false,
      },
      {
        type: "Paragraph",
        id: "some-unique-id-5",
        label: "Share your thoughts on the following topic",
        required: true,
        focus: false,
      },
      {
        type: "Checkboxes",
        id: "some-unique-id-6",
        label: "Select your hobbies",
        options: ["Reading", "Traveling", "Sports"],
        required: false,
        focus: true,
      },
      {
        type: "File upload",
        id: "some-unique-id-9",
        label: "Upload your resume",
        required: true,
        focus: false,
      },
      {
        type: "Time",
        id: "some-unique-id-10",
        label: "Select your preferred time",
        required: false,
        focus: false,
      },
    ],
    userId: "12345678",
    user: "Ashwani",
    lastModified: "2023-11-23T00:15:00Z",
  },
];

const Page = () => {
  // TODO:Create a api and fetch the user forms from db , for now its constant
  const router = useRouter();
  const formattedDate = (date: string | number | Date) => {
    const lastModifiedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);

    return formatter.format(lastModifiedDate);
  };

  return (
    <div>
      <div className=" bg-gray-100 ">
        <div className="container lg:px-48 px-5 bg-gray-100 flex flex-col  mx-auto">
          <div className="p-5 pl-1 items-center justify-start">
            <h1>Start New Form</h1>
          </div>
          <div className="flex flex-wrap pb-8">
            <div className=" flex  flex-col ">
              <Link href={"/create"}>
                <Image
                  src="/redPlus.jpg"
                  height={150}
                  width={150}
                  alt="red plus sign"
                  className="rounded-md  border hover:border-red-400 cursor-pointer"
                />
              </Link>
              <div className="p-2 text-sm">Blank Form</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container lg:px-48 px-5  flex flex-col  mx-auto">
        <div className="py-4">
          <h1>Recent Forms</h1>
        </div>
        <div className="flex flex-wrap -m-4 cursor-pointer ">
          {forms.map((form) => (
            <Link
              className="p-4 max-w-xs "
              key={form._id}
              href={`/edit?formid=${form._id}`}
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden  hover:border-red-500">
                <img
                  className="h-48 w-full object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="blog"
                />

                <div className="flex items-center justify-between flex-wrap p-4">
                  <div className="flex flex-col items-start">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-2">
                      {form.formFields[0].label}
                    </h1>
                    <div className="flex items-center text-xs title-font font-medium text-gray-400 mb-1 ">
                      <MdOutlineAccessTime />
                      <p className="pl-1">{formattedDate(form.lastModified)}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl p-3 hover:bg-gray-100 cursor-pointer">
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
// /user/setUpVendor/services?service=${selectedService}
