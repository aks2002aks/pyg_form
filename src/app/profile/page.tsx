"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MdOutlineEmail } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import Link from "next/link";
import VerifyPhoneOrEmail from "@/components/user/verifyPhoneOrEmail";
import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
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

  const handleVerifyEmail = async () => {
    setShowModal(true);
    setIsEmail(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sendEmailOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (session?.user.profileImageUrl) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/deleteProfileImage?fileKey=${session?.user.profileImageUrl}`
      );
      const { success } = data;

      if (success) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/setProfileImageUrl`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
              body: JSON.stringify({
                userId: session?.user.id,
                profileImageUrl: "",
              }),
            }
          );

          const { success, id } = await res.json();

          if (!success) {
            toast.error("Failed to Save Image.");
          } else {
            toast.success("Deleted Image SucessFully");
          }
        } catch (error) {
          toast.error("Error Saving Image :" + error);
        }
      } else {
        toast.error("Error in deleting image");
      }
    }

    const file = e.target.files?.[0];

    const fileKey = `${session?.user.id}`;

    if (file) {
      const imageType = file.type.split("/")[0];
      if (imageType !== "image") {
        toast.error("Please select image only");
        return;
      }

      // upload image to s3
      try {
        const fileType = encodeURIComponent(file.type);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/uploadProfileImage?fileType=${fileType}&fileKey=${fileKey}&fileName=${file.name}`
        );
        const { success, uploadUrl, Key, message } = data;

        if (success) {
          await axios.put(uploadUrl, file);

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/setProfileImageUrl`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session?.user.accessToken}`,
                },
                body: JSON.stringify({
                  userId: session?.user.id,
                  profileImageUrl: Key,
                }),
              }
            );

            const { success, id } = await res.json();

            if (!success) {
              toast.error("Failed to upload Image.");
            } else {
              toast.success("Image Uploaded SucessFully , Relogin To see it");
            }
          } catch (error) {
            toast.error("Error uploading Image :" + error);
          }
        }
      } catch (error) {
        toast.error("Error uploading Image :" + error);
      }
    }
  };

  return (
    <>
      {showModal && (
        <VerifyPhoneOrEmail
          inputValue={
            isEmail
              ? (session?.user?.email as string)
              : (session?.user?.phone as string)
          }
          setShowModal={setShowModal}
        />
      )}
      <div className="profile-page ">
        <div className="relative block h-[350px] lg:h-[450px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('https://source.unsplash.com/random/3120x1440/?nature')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <div className="relative py-16 bg-gray-200 ">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4  flex justify-center">
                    <div className="relative">
                      {session?.user?.profileImageUrl ? (
                        <Image
                          alt="..."
                          src={
                            process.env.NEXT_PUBLIC_AWS_IMAGE_CDN +
                            "/" +
                            session?.user?.profileImageUrl
                          }
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] max-h-[150px]"
                          width={150}
                          height={150}
                        />
                      ) : (
                        <Image
                          alt="..."
                          src="/profile.png"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]  max-h-[150px]"
                          width={150}
                          height={150}
                        />
                      )}
                      <label
                        className="absolute top-10 left-8 bg-gray-200 border-2 border-gray-400 p-2 rounded-full hover:bg-gray-100 m-2"
                        htmlFor={`profile-image-upload`}
                      >
                        <FaEdit size={15} />
                      </label>
                      <input
                        id={`profile-image-upload`}
                        type="file"
                        accept={"image/*"}
                        style={{ display: "none" }}
                        onChange={handleProfilePicture}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-24">
                  <h3 className="text-4xl font-semibold leading-normal mb-1 text-gray-700">
                    {session?.user?.firstName + " " + session?.user?.lastName}
                  </h3>
                  <h3
                    className="text-xl font-semibold leading-normal mb-2 text-gray-700 uppercase"
                    title="Account type"
                  >
                    {session?.user?.role}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                    <span className="flex items-center justify-center space-x-2">
                      <MdOutlineEmail size={20} />
                      <span>{session?.user?.email}</span>
                      {session?.user?.isEmailVerified ? (
                        <span className="text-green-500" title="Verified">
                          <MdVerified />
                        </span>
                      ) : (
                        <span className="text-red-500" title="Unverified">
                          <MdVerified />
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                    <span className="flex items-center justify-center space-x-2">
                      <BiPhone size={20} />
                      <span>{session?.user?.phone}</span>
                      {session?.user?.isPhoneVerified ? (
                        <span className="text-green-500" title="Verified">
                          <MdVerified />
                        </span>
                      ) : (
                        <span className="text-red-500" title="Unverified">
                          <MdVerified />
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                    <span className="flex items-center justify-center space-x-2">
                      <BsCalendar2Date size={20} />
                      <span>
                        Joined In{" "}
                        {session?.user?.createdAt &&
                          formattedDate(session?.user?.createdAt as string)}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-200 text-center">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <div className="bg-white p-3  rounded-sm text-start">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-4">
                          <span className="text-green-500">
                            <svg
                              className="h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </span>
                          <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700 pb-10 ">
                          <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                First Name
                              </div>
                              <div className="px-4 py-2">
                                {session?.user.firstName}
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Last Name
                              </div>
                              <div className="px-4 py-2">
                                {session?.user.lastName}
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Email.
                              </div>
                              <div className="px-4 py-2 text-blue-800">
                                {session?.user?.email}
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="px-4 py-2 font-semibold">
                                Contact No.
                              </div>
                              <div className="px-4 py-2">
                                {session?.user?.phone}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-evenly pt-10 border-t border-gray-200">
                          <div className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                            <Link href={"/user/resetPassword"}>
                              Reset Password
                            </Link>
                          </div>

                          {!session?.user?.isEmailVerified && (
                            <div className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                              <button onClick={handleVerifyEmail}>
                                Verify Email
                              </button>
                            </div>
                          )}

                          {/* {!session?.user?.isPhoneVerified && (
                            <div className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                              <button
                                onClick={() => {
                                  setShowModal(true);
                                  setIsEmail(false);
                                }}
                              >
                                Verify Phone
                              </button>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
