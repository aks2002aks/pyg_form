"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import GenricFormResponse from "../responseComponents/all_types_components/genric_form_response";
import {
  saveFormId,
  setFileUrlKey,
} from "@/redux/features/responseField/responseFieldSlice";
import { v4 as randomUUID } from "uuid";
import axios from "axios";
import _ from "lodash";

interface myFileType {
  fieldId: string;
  file: File;
}

interface Validation {
  selectedOption: string;
  numberInput?: number;
  customErrorMessage?: string;
}

const EditResponse = () => {
  const dispatch = useDispatch();
  const formFields = useSelector(
    (state: RootState) => state.formField.formFields
  );

  const [selectedFiles, setSelectedFiles] = useState<myFileType[] | null>(null);
  const formid = useSearchParams().get("formid");
  const responseid = useSearchParams().get("responseid");
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const allQuestionResponse = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const defaultFormRequired = useSelector(
    (state: RootState) =>
      state.formField.formSettings?.defaults.makeAllQuestionsRequire
  ) as boolean;

  const acceptingResponse = useSelector(
    (state: RootState) => state.formField.acceptingResponses
  ) as boolean;

  const acceptingResponseTill = useSelector(
    (state: RootState) => state.formField.acceptingResponsesTill
  ) as string;

  const response = useSelector((state: RootState) => state.formResponse);

  const userResponse = useMemo(() => _.cloneDeep(response), [response]);

  useEffect(() => {
    dispatch(saveFormId(formid as string));
  }, [dispatch, formid]);

  useEffect(() => {
    console.log("selectedFiles", selectedFiles);
  }, [selectedFiles]);

  const isValidationRequired = (fieldId: string) => {
    const field = formFields.find((field) => field.id === fieldId);
    return field?.validation;
  };

  const ValidateResponse = () => {
    let isValid = true;

    allQuestionResponse.forEach((response, index) => {
      const defaultRequired = response.required || defaultFormRequired;
      if (!isValid) return;

      if (response.type === "Date") {
        if (
          defaultRequired &&
          (!response.date || (response.isTime ? !response.time : false))
        ) {
          toast.error(`Question ${index + 1} : This field is required.`);
          isValid = false;
        }
      } else if (response.type === "Range") {
        if (defaultRequired && response.rangeTo === 0) {
          toast.error(`Question ${index + 1} : This field is required.`);
          isValid = false;
        }
      } else if (
        response.type === "Short answer" ||
        response.type === "Paragraph"
      ) {
        const vald: Validation = isValidationRequired(response.formFieldId);
        if (vald) {
          switch (vald.selectedOption) {
            case "greaterThan":
              if (response.answer.length <= (vald.numberInput ?? 0)) {
                isValid = false;
                if (!vald.customErrorMessage) {
                  toast.error(
                    `Input String Length more than ${vald.numberInput}`
                  );
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
              }
              break;
            case "greaterThanEqualTo":
              if (response.answer.length < (vald.numberInput ?? 0)) {
                isValid = false;
                if (!vald.customErrorMessage) {
                  toast.error(
                    `Input String Length at least ${vald.numberInput}`
                  );
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
              }
              break;
            case "lessThan":
              if (response.answer.length >= (vald.numberInput ?? 0)) {
                if (!vald.customErrorMessage) {
                  toast.error(`Input String Length at most {numberInput}`);
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
                isValid = false;
              }
              break;
            case "lessThanEqualTo":
              if (response.answer.length > (vald.numberInput ?? 0)) {
                if (!vald.customErrorMessage) {
                  toast.error(
                    `Input String Length at most ${vald.numberInput}`
                  );
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
                isValid = false;
              }
              break;
            case "equalTo":
              if (response.answer.length !== (vald.numberInput ?? 0)) {
                if (!vald.customErrorMessage) {
                  toast.error(
                    `Input String Length should be exactly ${vald.numberInput}`
                  );
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
                isValid = false;
              }
              break;
            case "notEqualTo":
              if (response.answer.length === (vald.numberInput ?? 0)) {
                if (!vald.customErrorMessage) {
                  toast.error(
                    `Input String Length Not equal to ${vald.numberInput}`
                  );
                } else {
                  toast.error(`${vald.customErrorMessage}`);
                }
                isValid = false;
              }
              break;
            default:
              // Handle other validation types if needed
              break;
          }
        } else {
          if (defaultRequired && !response.answer) {
            toast.error(`Question ${index + 1} : This field is required.`);
            isValid = false;
          }
        }
      } else if (response.type === "Checkboxes") {
        const vald: Validation = isValidationRequired(response.formFieldId);
        if (vald) {
          if (vald.selectedOption === "atLeast") {
            if (
              defaultRequired &&
              response.answer.length < (vald.numberInput ?? 0)
            ) {
              if (!vald.customErrorMessage) {
                toast.error(
                  `Select at least ${vald.numberInput} options from the list.`
                );
              } else {
                toast.error(`${vald.customErrorMessage}`);
              }
              isValid = false;
            }
          } else if (vald.selectedOption === "atMost") {
            if (
              defaultRequired &&
              response.answer.length > (vald.numberInput ?? 0)
            ) {
              if (!vald.customErrorMessage) {
                toast.error(
                  `Select at most ${vald.numberInput} options from the list.`
                );
              } else {
                toast.error(`${vald.customErrorMessage}`);
              }
              isValid = false;
            }
          } else if (vald.selectedOption === "exactly") {
            if (
              defaultRequired &&
              response.answer.length !== (vald.numberInput ?? 0)
            ) {
              if (!vald.customErrorMessage) {
                toast.error(
                  `Select exactly ${vald.numberInput} options from the list.`
                );
              } else {
                toast.error(`${vald.customErrorMessage}`);
              }
              isValid = false;
            }
          }
        } else {
          if (defaultRequired && response.answer.length === 0) {
            toast.error(`Question ${index + 1} : This field is required.`);
            isValid = false;
          }
        }
      } else if (response.type === "Time") {
        if (defaultRequired && !response.time) {
          toast.error(`Question ${index + 1} : This field is required.`);
          isValid = false;
        }
      } else if (
        response.type === "File upload" ||
        response.type === "Drop-down" ||
        response.type === "Multiple choice"
      ) {
        if (defaultRequired && response.answer === "") {
          toast.error(`Question ${index + 1} : This field is required.`);
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const handleFileUpload = async (
    file: File,
    formid: string,
    fieldId: string
  ) => {
    try {
      // save files to s3
      const file_key = `${formid}/${session?.user.id}/${randomUUID()}`;

      const fileType = encodeURIComponent(file.type);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/uploadFile?fileType=${fileType}&fileKey=${file_key}&fileName=${file.name}`
      );
      const { success, uploadUrl, Key, message } = data;

      if (success) {
        await axios.put(uploadUrl, file);
        dispatch(
          setFileUrlKey({
            formFieldId: fieldId,
            fileUrlKey: Key,
          })
        );
        toast.success("File uploaded successfully");
        return { Key, success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      toast.error("Error uploading file: " + error);
      return { success: false };
    }
  };

  const handleSubmitResponse = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const currentDate = new Date();
    const AllowedDate = new Date(acceptingResponseTill);
    if (acceptingResponse || currentDate <= AllowedDate) {
      if (ValidateResponse()) {
        setLoading(true);

        if (selectedFiles !== null) {
          for (const myfile of selectedFiles) {
            const handle = await handleFileUpload(
              myfile.file,
              formid as string,
              myfile.fieldId
            );

            if (!handle.success) {
              setLoading(false);
              toast.error("Failed to upload file.");
              return;
            } else {
              userResponse.formResponses.forEach((response) => {
                if (response.formFieldId === myfile.fieldId) {
                  response.fileUrlKey = handle.Key;
                }
              });
            }
          }
        }

        // Continue with form submission if all file uploads are successful
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/editFormResponse`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                responseId: responseid,
                userResponse: userResponse,
              }),
            }
          );

          const { success, id } = await res.json();
          if (!success) {
            toast.error("Failed to save form response.");
          } else {
            toast.success("Saved Successfully");
            router.push(
              `/forms/submittedForm?formid=${formid}&responseid=${id}`
            );
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Failed to submit form.");
        }
        setLoading(false);
      }
    } else {
      toast.error("Form is not accepting responses");
      router.push(`/forms/form?formid=${formid}`);
    }
  };

  return (
    <>
      <div className=" bg-gray-100 rounded">
        <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:pl-12 md:pr-12 pt-4 pb-20">
          <form className="w-full" onSubmit={handleSubmitResponse}>
            <div className="w-full flex flex-col space-y-4 justify-center items-center">
              {formFields.map((field, index) => (
                <GenricFormResponse
                  key={index}
                  field={field}
                  index={index}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                />
              ))}

              <div className="container flex justify-start w-36">
                <div className="p-2 w-full border-l-6 border-transparent rounded-lg">
                  <div className="flex items-center space-x-2 justify-center">
                    <div className=" bg-red-200 hover:bg-red-400  py-2 px-4 rounded-full cursor-pointer">
                      {loading ? (
                        <svg
                          className="h-5 w-5 animate-spin stroke-gray-500"
                          viewBox="0 0 256 256"
                        >
                          <line
                            x1="128"
                            y1="32"
                            x2="128"
                            y2="64"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="195.9"
                            y1="60.1"
                            x2="173.3"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="224"
                            y1="128"
                            x2="192"
                            y2="128"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="195.9"
                            y1="195.9"
                            x2="173.3"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="128"
                            y1="224"
                            x2="128"
                            y2="192"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="60.1"
                            y1="195.9"
                            x2="82.7"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="32"
                            y1="128"
                            x2="64"
                            y2="128"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                          <line
                            x1="60.1"
                            y1="60.1"
                            x2="82.7"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                          ></line>
                        </svg>
                      ) : (
                        <button type="submit" className="">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditResponse;
