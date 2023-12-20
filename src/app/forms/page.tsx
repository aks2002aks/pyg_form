"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "./confirmation_modal";

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
  const [forms, setforms] = useState<formField[]>();
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
    const getAllForms = async () => {
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
        }
      );

      const { forms } = await res.json();

      setforms(forms);
    };
    getAllForms();
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
              label: "",
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

  const variants = {
    initial: { rotate: 0 },
    complete: { rotate: 360 },
  };

  return (
    <>
      {deleteConfirmation && (
        <ConfirmationModal
          setDeleteConfirmation={setDeleteConfirmation}
          selectedForm={selectedForm}
          setforms={setforms}
          forms={forms as formField[]}
        />
      )}
      {loading && (
        <div className="">
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="w-64 h-64 rounded-full flex items-center justify-center">
              <motion.div
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
                variants={variants}
                initial="initial"
                animate="complete"
                transition={{ duration: 1, repeat: Infinity }}
              ></motion.div>
            </div>
          </div>
        </div>
      )}
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
          <div className="py-4">
            <h1>Recent Forms</h1>
          </div>
          <div className="flex flex-wrap gap-6  ">
            {forms &&
              forms.map((form) => (
                <div className=" relative " key={form._id} style={{maxWidth:"280px"}}>
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden  hover:border-red-500">
                    <Link href={`/edit?formid=${form._id}&view="Questions"`}>
                      <Image
                        className="h-48 w-full object-cover object-center cursor-pointer"
                        src="https://dummyimage.com/720x400"
                        alt="blog"
                        height={720}
                        width={400}
                      />
                    </Link>

                    <div className="flex items-center justify-between  p-4">
                      <Link href={`/edit?formid=${form._id}&view="Questions"`}>
                        <div className="flex flex-col items-start">
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-2 text-wrap">
                            {form.formName}
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
                        <div className="absolute z-10 right-8 -bottom-8 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
// /user/setUpVendor/services?service=${selectedService}
