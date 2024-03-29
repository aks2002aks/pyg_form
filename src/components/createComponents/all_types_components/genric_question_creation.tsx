"use client";

import React, { useState, useRef, useEffect, use } from "react";
import QuestionInput from "../all_types_components/question_input";
import { FaRegImages } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Question_type from "../all_types_components/question_type";
import Short_answer from "../all_answer_types/short_answer";
import Paragraph from "../all_answer_types/paragraph";
import Multiple_choice from "../all_answer_types/multiple_choice";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa";
import Checkboxes from "../all_answer_types/checkboxes";
import CheckboxesValidation from "../all_validation_types/checkboxes_validation";
import ShortParagraphValidation from "../all_validation_types/short_paragraph_validation";
import DropDown from "../all_answer_types/dropdown";
import FileUpload from "../all_answer_types/file_upload";
import Date from "../all_answer_types/date";
import Time from "../all_answer_types/time";
import { PiDotsSixBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  copyFormField,
  deleteFormField,
  handleDescriptionChange,
  handleRequiredChange,
  handleTimeChange,
  setFocus,
  setImageUrlKey,
} from "@/redux/features/formField/formFieldSlice";
import ImageEditor from "./ImageEditor";
import { v4 as randomUUID } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState } from "@/redux/store/store";
import Range from "@/components/createComponents/all_answer_types/range";
import { useSession } from "next-auth/react";

interface FormField {
  type: string;
  id: string;
  label: string;
  focus: boolean;
  options?: string[];
  isOther?: boolean;
  otherText?: string;
  description?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  required: boolean;
  validation?: any;
  fileValidation?: any;
  isTime?: boolean;
  imageUrlKey?: string;
  imageSettings?: {
    width: number;
    height: number;
    align: string;
  };
}

interface Props {
  field: FormField;
  index: number;
  handleDragStart: () => void;
  handleDragEnd: () => void;
  handleSaveEdit: () => void;
}

const Genric_Question_Creation: React.FC<Props> = ({
  field,
  index,
  handleDragStart,
  handleDragEnd,
  handleSaveEdit,
}) => {
  const {data:session} = useSession();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(field.type);
  const [isOpen, setIsOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const dropdownRef = useRef(null);
  const formId = useSelector((state: RootState) => state.formField._id);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRequiredInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRequired(e.target.checked);
    dispatch(handleRequiredChange({ index, newRequired: e.target.checked }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const uploadImageToS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const fileKey = `${formId}/${randomUUID()}`;

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
          `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/uploadImage?fileType=${fileType}&fileKey=${fileKey}&fileName=${file.name}`
        );
        const { success, uploadUrl, Key, message } = data;

        if (success) {
          await axios.put(uploadUrl, file);
          dispatch(setImageUrlKey({ index, imageKey: Key }));
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/saveImageUrlKey`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session?.user.accessToken}`,
                },
                body: JSON.stringify({
                  formId: formId,
                  fieldId: field.id,
                  imageUrlKey: Key,
                }),
              }
            );

            const { success, id } = await res.json();

            if (!success) {
              toast.error("Failed to Save Image.");
            } else {
              toast.success("Saved Image SucessFully");
            }
          } catch (error) {
            toast.error("Error Saving Image :" + error);
          }
        }
      } catch (error) {
        toast.error("Error Saving Image :" + error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowDescription(false);
    setShowValidation(false);
  }, [selectedValue]);

  const rendorAnswerType = (selectedValue: string) => {
    if (selectedValue == "Short answer") {
      return <Short_answer />;
    } else if (selectedValue == "Paragraph") {
      return <Paragraph />;
    } else if (selectedValue == "Multiple choice") {
      return <Multiple_choice focus={field.focus} index={index} />;
    } else if (selectedValue == "Drop-down") {
      return <DropDown focus={field.focus} index={index} />;
    } else if (selectedValue == "Checkboxes") {
      return <Checkboxes focus={field.focus} index={index} />;
    } else if (selectedValue == "Range") {
      return (
        <Range
          focus={field.focus}
          index={index}
          minValue={field.minValue}
          maxValue={field.maxValue}
          step={field.step}
        />
      );
    } else if (selectedValue == "File upload") {
      return <FileUpload index={index} />;
    } else if (selectedValue == "Date") {
      return <Date showIncludeTime={field.isTime as boolean} />;
    } else if (selectedValue == "Time") {
      return <Time />;
    } else {
      <></>;
    }
  };

  const rendorValidationType = (selectedValue: string) => {
    if (selectedValue == "Short answer") {
      return (
        <ShortParagraphValidation
          showValidation={showValidation}
          setShowValidation={setShowValidation}
          index={index}
        />
      );
    } else if (selectedValue == "Paragraph") {
      return (
        <ShortParagraphValidation
          showValidation={showValidation}
          setShowValidation={setShowValidation}
          index={index}
        />
      );
    } else if (selectedValue == "Checkboxes") {
      return (
        <CheckboxesValidation
          showValidation={showValidation}
          setShowValidation={setShowValidation}
          options={field.options as string[]}
          index={index}
        />
      );
    } else {
      <></>;
    }
  };

  if (field.type === "Title and description") {
    return (
      <div
        className="bg-white container max-w-3xl rounded-xl border-t-8 border-t-red-200"
        onClick={() => {
          if (!field.focus) {
            dispatch(setFocus({ index }));
          }
        }}
      >
        <div
          className={`p-5 w-full border-l-[6px] rounded-lg space-y-4 ${
            field.focus ? "border-l-blue-300" : ""
          }`}
        >
          <QuestionInput
            input_label="Title"
            placeholder_text="Untitled Form"
            text_size="35"
            focus={false}
            type="text"
            index={index}
            label={field.label}
          />
          <QuestionInput
            input_label="Description"
            placeholder_text="Description"
            text_size="15"
            focus={false}
            type="description"
            index={index}
            label={field.description as string}
          />
        </div>
      </div>
    );
  } else if (field.type === "Internal Title and Description") {
    return (<div
      className="bg-white container max-w-3xl rounded-xl border-t-8 border-t-red-200"
      onClick={() => {
        if (!field.focus) {
          dispatch(setFocus({ index }));
        }
      }}
    >
      <div
        className={`p-5 w-full border-l-[6px] rounded-lg  ${
          field.focus ? "border-l-blue-300" : ""
        }`}
      >
        <QuestionInput
          input_label="Title"
          placeholder_text="Untitled Form"
          text_size="25"
          focus={false}
          type="text"
          index={index}
          label={field.label}
        />
        <QuestionInput
          input_label="Description"
          placeholder_text="Description"
          text_size="13"
          focus={false}
          type="description"
          index={index}
          label={field.description as string}
        />
        {field.focus && (
        <>
          <div className="border-b py-1"></div>
          <div className="flex justify-end items-center space-x-3 mt-4">
            <div className="flex justify-end items-center space-x-3">
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => dispatch(copyFormField({}))}
              >
                <FaRegCopy size={20} />
              </div>
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => {
                  dispatch(deleteFormField({}));
                }}
              >
                <MdDelete size={20} />
              </div>
            </div>
          </div>
        </>
      )}
      </div>
      
    </div>)
  } else {
    return (
      <div
        className="relative bg-white container max-w-3xl rounded-xl"
        onClick={() => {
          if (!field.focus) {
            dispatch(setFocus({ index }));
          }
        }}
      >
        <div
          className={`p-5 w-full border-l-[6px] rounded-lg space-y-4 ${
            field.focus ? "border-l-blue-300" : ""
          }`}
        >
          <div
            className="flex h-10 justify-center hover:cursor-grab focus:cursor-grabbing "
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
          >
            <PiDotsSixBold size={28} />
          </div>
          <div className="flex sm:flex-row flex-col space-x-4 sm:items-center items-start sm:space-y-4">
            {/* fixed : question  */}
            <div className="sm:w-2/3 w-full">
              <QuestionInput
                input_label={selectedValue?.replace(/ /g, "_").toLowerCase()}
                placeholder_text={" Question here ...."}
                text_size="18"
                focus={field.focus}
                type="text"
                index={index}
                label={field.label}
              />
            </div>

            {/* fixed : part question type and add image button */}
            <div className="flex sm:w-1/3 w-full space-x-2  items-center">
              {field.focus && (
                <>
                  <div className="flex sm:h-10 h-14 items-center">
                    <label
                      htmlFor={`image-upload-${index}`}
                      className="cursor-pointer hover:bg-gray-100  rounded-full p-2"
                    >
                      <FaRegImages size={20} />
                    </label>
                    <input
                      id={`image-upload-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={uploadImageToS3}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="w-full  p-3 rounded-md">
                    <Question_type
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                      index={index}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {showDescription && (
            <QuestionInput
              input_label="Description"
              placeholder_text="Description"
              text_size="15"
              focus={field.focus}
              type="description"
              index={index}
              label={field.description as string}
            />
          )}

          {field.imageUrlKey && (
            <ImageEditor
              imageUrlKey={field.imageUrlKey}
              index={index}
              field={field}
              imageSetting={
                field.imageSettings || {
                  width: 200,
                  height: 200,
                  align: "justify-start",
                }
              }
            />
          )}
          {/* dynamic : question answer  */}
          {rendorAnswerType(selectedValue)}
          {showValidation && rendorValidationType(selectedValue)}
          {field.focus && (
            <>
              <div className="border-b py-4"></div>
              <div className="flex justify-end items-center space-x-3">
                <div className="hidden md:flex justify-end items-center space-x-3">
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => dispatch(copyFormField({}))}
                  >
                    <FaRegCopy size={20} />
                  </div>
                  <div
                    className="text-gray-500 cursor-pointer"
                    onClick={() => {
                      dispatch(deleteFormField({}));
                    }}
                  >
                    <MdDelete size={20} />
                  </div>
                </div>

                <div className="border-l border h-8"></div>
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Required
                </label>
                <input
                  className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isRequired}
                  onChange={handleRequiredInputChange}
                />
                <div className="relative ">
                  {/* Dropdown toggle button */}
                  <button
                    onClick={toggleDropdown}
                    className={`relative z-10 block p-2 text-gray-700  border border-transparent rounded-2xl  ${
                      isOpen ? "bg-gray-300" : "hover:bg-gray-100"
                    }`}
                  >
                    <HiOutlineDotsVertical />
                  </button>

                  {/* Dropdown menu */}
                  {isOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-20 w-52 py-2 mt-2 origin-top-right bg-white rounded-md shadow-2xl border"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* duplicate and delete button  */}
                      <div className="flex md:hidden flex-col">
                        <div
                          className=" flex space-x-2 justify-start items-center hover:bg-gray-100 p-2 cursor-pointer"
                          onClick={() => dispatch(copyFormField({}))}
                        >
                          <FaRegCopy size={20} />
                          <p>Duplicate Item</p>
                        </div>
                        <div
                          className=" flex space-x-2 justify-start items-center hover:bg-gray-100 p-2 cursor-pointer"
                          onClick={() => dispatch(deleteFormField({}))}
                        >
                          <MdDelete size={20} />
                          <p>Delete Item</p>
                        </div>
                      </div>

                      {/* Dropdown items */}
                      <p className="text-gray-700 pl-4">show</p>
                      <div
                        className={`flex space-x-2 justify-start items-center hover:bg-gray-100 p-2 cursor-pointer ${
                          showDescription && "bg-red-50"
                        }`}
                        onClick={(e) => {
                          setShowDescription(!showDescription);
                          e.stopPropagation();
                          if (showDescription === false) {
                            dispatch(
                              handleDescriptionChange({
                                index,
                                newDescription: "",
                              })
                            );
                          }
                        }}
                      >
                        <div className="flex w-5 h-10 items-center">
                          {showDescription && <TiTick size={20} />}
                        </div>
                        <p>Description</p>
                      </div>
                      {selectedValue !== "Multiple choice" &&
                        selectedValue !== "Drop-down" &&
                        selectedValue !== "File upload" &&
                        selectedValue !== "Date" &&
                        selectedValue !== "Time" &&
                        selectedValue !== "Range" && (
                          <div
                            className={`flex space-x-2 justify-start items-center hover:bg-gray-100 p-2 cursor-pointer ${
                              showValidation && "bg-red-50"
                            }`}
                            onClick={(e) => {
                              setShowValidation(!showValidation);
                              e.stopPropagation();
                            }}
                          >
                            <div className="flex w-5 h-10 items-center">
                              {showValidation && <TiTick size={20} />}
                            </div>
                            <p>Response validation</p>
                          </div>
                        )}
                      {selectedValue === "Date" && (
                        <div
                          className={`flex space-x-2 justify-start items-center hover:bg-gray-100 p-2 cursor-pointer ${
                            field.isTime && "bg-red-50"
                          }`}
                          onClick={(e) => {
                            dispatch(
                              handleTimeChange({
                                index,
                                setTime: !field.isTime,
                              })
                            );
                            e.stopPropagation();
                          }}
                        >
                          <div className="flex w-5 h-10 items-center">
                            {field.isTime && <TiTick />}
                          </div>
                          <p>Include Time</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Genric_Question_Creation;
