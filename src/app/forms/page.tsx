"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "./confirmation_modal";
import Loader from "@/components/common/loader";
import { CiSettings } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { IoListOutline } from "react-icons/io5";
import { BsClipboardData } from "react-icons/bs";
import { FaFileWaveform } from "react-icons/fa6";

interface formField {
  _id: string;
  updatedAt: Date;
  formName: string;
}

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [forms, setForms] = useState<formField[]>();
  const [view, setView] = useState("grid");
  const [selectedForm, setSelectedForm] = useState<formField | null>(null);

  const handleDropdownClick = (form: formField) => {
    setSelectedForm(form === selectedForm ? null : form);
  };

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

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getAllForms = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getAllForms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id,
          }),
          signal,
        }
      );

      const { forms } = await res.json();

      const sortedForms = forms?.sort(
        (
          a: { updatedAt: string | number | Date },
          b: { updatedAt: string | number | Date }
        ) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }
      );

      setForms(sortedForms);
      setLoading(false);
    };
    getAllForms();

    return () => {
      controller.abort();
    };
  }, [session?.user.id]);

  const handleCreateForm = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/createQuestionForm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          user: session?.user.firstName,
          formField: [
            {
              type: "Title and description",
              id: "aff32523f32r2fa",
              label: "<p>Untitled form</p>",
              required: false,
              focus: false,
            },
            {
              type: "Multiple choice",
              id: "wegefww23t223rvv",
              label: "<p>Question</p>",
              options: ["Option 1", "Option 2"],
              required: false,
              focus: true,
            },
          ],
        }),
      }
    );

    const { id } = await res.json();
    router.push(`/edit?formid=${id}&view="Questions"`);
    setLoading(false);
  };

  return (
    <>
      {deleteConfirmation && (
        <ConfirmationModal
          setDeleteConfirmation={setDeleteConfirmation}
          selectedForm={selectedForm}
          setForms={setForms}
          forms={forms as formField[]}
        />
      )}
      {loading && <Loader />}
      <div>
        <div className=" bg-gray-100 ">
          <div className="container lg:px-48 px-5 bg-gray-100 flex flex-col  mx-auto">
            <div className="p-5 pl-1 items-center justify-start">
              <h1>Start New Form</h1>
            </div>
            <div className="flex flex-wrap pb-8">
              <div className=" flex  flex-col ">
                <div onClick={handleCreateForm}>
                  <Image
                    src="/redPlus.jpg"
                    height={150}
                    width={150}
                    alt="red plus sign"
                    className="rounded-md  border hover:border-red-400 cursor-pointer"
                  />
                </div>
                <div className="p-2 text-sm">Blank Form</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container lg:px-48 px-5  flex flex-col  mx-auto pb-20 ">
          <div className="py-4 flex  items-center space-x-3">
            <h1 className="mr-2">Recent Forms</h1>
            <IoGridOutline
              size={35}
              className={`p-2 rounded-full cursor-pointer ${
                view === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setView("grid")}
              title="Grid View"
            />
            <IoListOutline
              size={35}
              className={`p-2 rounded-full cursor-pointer ${
                view === "list" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setView("list")}
              title="List View"
            />
          </div>
          {view === "grid" && (
            <div className="flex flex-wrap gap-6  ">
              {forms &&
                forms.map((form) => (
                  <div
                    className=" relative "
                    key={form._id}
                    style={{ width: "280px" }}
                  >
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden  hover:border-red-500">
                      <Link href={`/edit?formid=${form._id}&view="Questions"`}>
                        <Image
                          className="h-48 w-full object-cover object-center cursor-pointer"
                          src={`https://source.unsplash.com/random/?${form.formName}`}
                          alt="blog"
                          height={720}
                          width={400}
                        />
                      </Link>

                      <div className="flex items-center justify-between  p-4">
                        <Link
                          href={`/edit?formid=${form._id}&view="Questions"`}
                        >
                          <div className="flex flex-col items-start">
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-2 text-wrap flex items-center space-x-2">
                              <FaFileWaveform size={20} />
                              <span>{form.formName}</span>
                            </h1>
                            <div className="flex items-center text-xs title-font font-medium text-gray-400 mb-1 ">
                              <MdOutlineAccessTime />
                              <p className="pl-1">Opened</p>

                              <p className="pl-1">
                                {formattedDate(form.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div
                          className="rounded-3xl p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleDropdownClick(form);
                          }}
                        >
                          <BsThreeDotsVertical />
                        </div>

                        {selectedForm === form && (
                          <div className="absolute z-10 right-8 -bottom-32 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            {/* Dropdown menu content */}
                            <div className="py-1">
                              <div
                                className="flex items-center px-4 py-2 text-md  text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                onClick={() => setDeleteConfirmation(true)}
                              >
                                <RiDeleteBin6Line size={20} className="mr-2" />
                                Delete Form
                              </div>
                            </div>
                            <div className="py-1">
                              <Link
                                href={`/edit?formid=${form._id}&view=Responses`}
                                className="flex items-center px-4 py-2 text-md  text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                title="Responses"
                              >
                                <BsClipboardData size={20} className="mr-2" />
                                Responses
                              </Link>
                            </div>
                            <div className="py-1">
                              <Link
                                href={`/edit?formid=${form._id}&view=Settings`}
                                className="flex items-center px-4 py-2 text-md  text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                title="Settings"
                              >
                                <CiSettings size={20} />
                                Settings
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {view === "list" && (
            <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Form Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 flex items-center space-x-1 flex-nowrap"
                      >
                        <MdOutlineAccessTime />
                        <span>Opened on</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {forms &&
                      forms.map((form, index) => {
                        return (
                          <tr
                            className={`bg-white  dark:border-gray-700 hover:bg-gray-50 ${
                              forms.length - 1 === index ? "" : "border-b"
                            }`}
                            key={index}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center space-x-2"
                            >
                              <FaFileWaveform size={20} />
                              <span>{form.formName}</span>
                            </th>
                            <td className="px-6 py-4">
                              {formattedDate(form.updatedAt)}
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-2">
                              <RiDeleteBin6Line
                                size={35}
                                onClick={() => {
                                  handleDropdownClick(form);
                                  setDeleteConfirmation(true);
                                }}
                                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                                title="Delete"
                              />
                              <Link
                                href={`/edit?formid=${form._id}&view=Responses`}
                                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                                title="Responses"
                              >
                                <BsClipboardData size={18} />
                              </Link>

                              <Link
                                href={`/edit?formid=${form._id}&view=Settings`}
                                className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                                title="Settings"
                              >
                                <CiSettings size={20} />
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link
                                href={`/edit?formid=${form._id}&view="Questions"`}
                                className="font-medium text-blue-600 hover:underline"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
// /user/setUpVendor/services?service=${selectedService}
