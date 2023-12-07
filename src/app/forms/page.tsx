"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface formField {
  _id: string;
  updatedAt: Date;
  formName: string
}

const Page = () => {
  // TODO:Create a api and fetch the user forms from db , for now its constant
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [forms, setforms] = useState<formField[]>();
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
              label: "Untitled form",
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
          ]
        }),
      }
    );

    const { id } = await res.json();
    router.push(`/edit?formid=${id}`);
    setLoading(false);
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
          <div className="flex flex-wrap -m-4  ">
            {forms &&
              forms.map((form) => (
                <Link
                  className="p-4 max-w-xs cursor-pointer"
                  key={form._id}
                  href={`/edit?formid=${form._id}`}
                >
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden  hover:border-red-500">
                    <Image
                      className="h-48 w-full object-cover object-center"
                      src="https://dummyimage.com/720x400"
                      alt="blog"
                      height={720}
                      width={400}
                    />

                    <div className="flex items-center justify-between flex-wrap p-4">
                      <div className="flex flex-col items-start">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-2">
                          {form.formName}
                        </h1>
                        <div className="flex items-center text-xs title-font font-medium text-gray-400 mb-1 ">
                          <MdOutlineAccessTime />
                          <p className="pl-1">
                            {formattedDate(form.updatedAt)}
                          </p>
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
    </>
  );
};

export default Page;
// /user/setUpVendor/services?service=${selectedService}
