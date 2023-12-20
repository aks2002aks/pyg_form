import React, { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageSettings,
  setImageUrlKey,
} from "@/redux/features/formField/formFieldSlice";
import { IoRemoveSharp, IoResizeSharp } from "react-icons/io5";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RootState } from "@/redux/store/store";

interface ImageEditorProps {
  imageUrlKey: string;
  index: number;
  imageSetting: {
    width: number;
    height: number;
    align: string;
  };
  field: any;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  imageUrlKey,
  index,
  imageSetting,
  field,
}) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(imageSetting.width);
  const [height, setHeight] = useState(imageSetting.height);
  const [dimensions, setDimensions] = useState({
    width: imageSetting.width,
    height: imageSetting.height,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openResizeModal, setOpenResizeModal] = useState(false);
  const [align, setAlign] = useState(imageSetting.align);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formId = useSelector((state: RootState) => state.formField._id);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const deleteImageFromS3 = async () => {
    setIsDropdownOpen(false);
    const file_key = imageUrlKey;

    if (imageUrlKey) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/deleteImage?fileKey=${file_key}`
      );
      const { success } = data;

      if (success) {
        dispatch(setImageUrlKey({ index, imageKey: "" }));
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/saveImageUrlKey`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                formId: formId,
                fieldId: field.id,
                imageUrlKey: "",
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
  };

  return (
    <div className={`relative py-3 flex  ${align}  `}>
      <Image
        src={
          imageUrlKey
            ? `${process.env.NEXT_PUBLIC_AWS_IMAGE_CDN}/${imageUrlKey}`
            : ""
        }
        alt="Resizable Image"
        width={dimensions.width}
        height={dimensions.height}
        priority
      />
      <div className="absolute top-0 right-0 cursor-pointer " ref={dropdownRef}>
        <BsThreeDotsVertical
          onClick={handleDropdownToggle}
          className={` rounded-full p-2 ${
            isDropdownOpen ? "bg-gray-500" : "hover:bg-gray-300 "
          }`}
          size={35}
        />
        {isDropdownOpen && (
          <div className="absolute w-36 flex flex-col bg-gray-100 dropdown-menu p-1 rounded top-10 right-5 gap-y-2 border">
            <div
              className="flex items-center justify-start dropdown-item hover:bg-gray-300 p-1 rounded-lg"
              onClick={() => {
                setAlign("justify-start");
                setIsDropdownOpen(false);
                dispatch(
                  setImageSettings({
                    index,
                    imageSettings: {
                      width: width,
                      height: height,
                      align: "justify-start",
                    },
                  })
                );
              }}
            >
              <BiAlignLeft className="mr-2" />
              Align Left
            </div>

            <div className="border-b" />
            <div
              className="flex items-center justify-start dropdown-item hover:bg-gray-300 p-1 rounded-lg"
              onClick={() => {
                setAlign("justify-center");
                setIsDropdownOpen(false);
                dispatch(
                  setImageSettings({
                    index,
                    imageSettings: {
                      width: width,
                      height: height,
                      align: "justify-center",
                    },
                  })
                );
              }}
            >
              <BiAlignMiddle className="mr-2" />
              Align Middle
            </div>

            <div className="border-b" />
            <div
              className="flex items-center justify-start dropdown-item hover:bg-gray-300 p-1 rounded-lg"
              onClick={() => {
                setAlign("justify-end");
                setIsDropdownOpen(false);
                dispatch(
                  setImageSettings({
                    index,
                    imageSettings: {
                      width: width,
                      height: height,
                      align: "justify-end",
                    },
                  })
                );
              }}
            >
              <BiAlignRight className="mr-2" />
              Align Right
            </div>

            <div className="border-b" />
            <div
              className="flex items-center justify-start dropdown-item hover:bg-gray-300 p-1 rounded-lg"
              onClick={() => setOpenResizeModal(true)}
            >
              <IoResizeSharp className="mr-2" />
              Resize
            </div>
            <div className="border-b" />
            <div
              className="flex items-center justify-start dropdown-item hover:bg-gray-300 p-1 rounded-lg"
              onClick={deleteImageFromS3}
            >
              <IoRemoveSharp className="mr-2" />
              Remove
            </div>
          </div>
        )}
      </div>

      {openResizeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg border">
              <p className="text-center">Set Dimensions</p>
              <div className="flex  items-center justify-center space-x-2 py-3">
                <div className="w-20">
                  <div className="relative w-full  h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Width
                    </label>
                  </div>
                </div>
                <div className="w-20">
                  <div className="relative w-full h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Height
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-center">
                <button
                  id="confirm-delete-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  onClick={() => {
                    if (width > 768) {
                      toast.error("Width cannot be greater than 768px");
                    } else {
                      setDimensions({ width: width, height: height });
                      dispatch(
                        setImageSettings({
                          index,
                          imageSettings: {
                            width: width,
                            height: height,
                            align: align,
                          },
                        })
                      );
                    }
                    setOpenResizeModal(false);
                  }}
                >
                  ok
                </button>
                <button
                  id="confirm-cancel-btn"
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                  onClick={() => {
                    setOpenResizeModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
