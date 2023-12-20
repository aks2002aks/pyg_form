import React, { useState } from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoAlertCircleOutline, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  answerFormField,
  setFileUrlKey,
} from "@/redux/features/responseField/responseFieldSlice";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface MyFileType {
  fieldId: string;
  file: File;
}

interface Props {
  required: boolean;
  fieldId: string;
  fileValidation: {
    allowedFileTypes: string[];
    maxNumFiles: number;
    maxFileSize: number;
  };
  selectedFiles: MyFileType[] | null;
  setSelectedFiles: React.Dispatch<React.SetStateAction<MyFileType[] | null>>;
}

const FileUpload: React.FC<Props> = ({
  required,
  fieldId,
  fileValidation,
  selectedFiles,
  setSelectedFiles,
}) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("This field is required.");
  const formId = useSelector((state: RootState) => state.formField._id);
  const responseId = useSearchParams().get("responseid");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (fileValidation.allowedFileTypes.length > 0) {
        if (isFileTypeAllowed(file.type)) {
          if (file.size <= fileValidation.maxFileSize * 1024 * 1024) {
            // File size is within the allowed limit
            setSelectedFile(file);
            setSelectedFiles([...(selectedFiles || []), { fieldId, file }]);
            dispatch(
              answerFormField({ formFieldId: fieldId, answer: file.name })
            );
            setMessage("This field is required."); // Clear the previous error message
          } else {
            // File size exceeds the allowed limit
            setSelectedFile(null);
            setMessage(
              `File size exceeds the allowed limit of ${fileValidation.maxFileSize} MB.`
            );
          }
        } else {
          setSelectedFile(null);
          setMessage("Invalid file type. Please select a valid file type.");
        }
      } else {
        if (file.size <= 10 * 1024 * 1024) {
          // console.log(" ia m in")
          // File size is within the allowed limit
          setSelectedFile(file);
          setSelectedFiles([...(selectedFiles || []), { fieldId, file }]);
          dispatch(
            answerFormField({ formFieldId: fieldId, answer: file.name })
          );
          setMessage("This field is required."); // Clear the previous error message
        } else {
          // File size exceeds the allowed limit
          setSelectedFile(null);
          setMessage("File size exceeds the allowed limit.");
        }
      }
    } else {
      setSelectedFile(null);
      setMessage("This field is required.");
    }
  };

  const isFileTypeAllowed = (fileType: string): boolean => {
    return fileValidation.allowedFileTypes.some((allowedType) => {
      return fileType === allowedType;
    });
  };

  const allQuestionResponses = useSelector(
    (state: RootState) => state.formResponse.formResponses
  );

  const fileUrlKey = allQuestionResponses.find(
    (response) => response.formFieldId === fieldId
  )?.fileUrlKey as string;

  const handleDeleteFile = async (Key: string) => {
    try {
      // save files to s3
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/deleteFile?fileKey=${Key}`
      );
      const { success } = data;

      if (success) {
        dispatch(
          setFileUrlKey({
            formFieldId: fieldId,
            fileUrlKey: "",
          })
        );
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/setFileUrlKey`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              responseId: responseId,
              fileUrlKey: "",
              formFieldId: fieldId,
              answer: "",
            }),
          }
        );
        const resp = await res.json();
        if (resp.success) {
          toast.success("File Deleted successfully");
        }
      }
    } catch (error) {
      toast.error("Error Deleting file: " + error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center">
        {fileUrlKey ? (
          <>
            <label
              htmlFor={`image-upload-${fieldId}`}
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded-full p-2 border"
            >
              {fileUrlKey?.split("/")[4]}
              <RxCross2
                size={20}
                className="mx-2"
                onClick={() => {
                  handleDeleteFile(fileUrlKey);
                }}
              />
            </label>
          </>
        ) : (
          <>
            {!selectedFile ? (
              <>
                <label
                  htmlFor={`image-upload-${fieldId}`}
                  className="flex items-center cursor-pointer hover:bg-gray-100 rounded-full p-2 border"
                >
                  <RiUploadCloud2Fill size={20} className="mr-2" />
                  Add File
                </label>
                <input
                  id={`image-upload-${fieldId}`}
                  type="file"
                  accept={
                    fileValidation.allowedFileTypes.length > 0
                      ? fileValidation.allowedFileTypes.join(",")
                      : "*/*"
                  }
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <div className="flex items-center space-x-2  hover:bg-gray-100 rounded-full p-2 border">
                <p className="text-gray-500 text-sm">{selectedFile.name}</p>
                <IoClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedFile(null);
                    setSelectedFiles(
                      (selectedFiles || []).filter(
                        (file) => file.fieldId !== fieldId
                      )
                    );
                    dispatch(
                      answerFormField({ formFieldId: fieldId, answer: "" })
                    );
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
      {required && !selectedFile && (
        <p className="text-red-500 text-sm mt-4 pt-2 flex space-x-2 items-center">
          <IoAlertCircleOutline size={20} />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
