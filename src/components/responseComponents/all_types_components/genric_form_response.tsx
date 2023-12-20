// import React from "react";

import Checkboxes from "../all_answer_types/checkboxes";
import React, { useState } from "react";
import QuestionDisplay from "./question_display";
import Image from "next/image";
import ResponseHeader from "./responseHeader";
import Multiple_choice from "../all_answer_types/multiple_choice";
import Short_answer from "../all_answer_types/short_answer";
import Paragraph from "../all_answer_types/paragraph";
import DropDown from "../all_answer_types/dropDown";
import FileUpload from "../all_answer_types/fileUpload";
import Date from "../all_answer_types/date";
import Time from "../all_answer_types/time";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Range from "../all_answer_types/range";
import InternalTitleAndDescription from "../all_answer_types/Internal_Title_and_Description";

interface FormField {
  type: string;
  id: string;
  label: string;
  focus: boolean;
  options?: string[];
  isOther?: boolean;
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

interface myFileType {
  fieldId: string;
  file: File;
}

interface Props {
  field: FormField;
  setSelectedFiles: React.Dispatch<React.SetStateAction<myFileType[] | null>>;
  selectedFiles: myFileType[] | null;
  index:number;
}

const GenricFormResponse: React.FC<Props> = ({
  field,
  setSelectedFiles,
  selectedFiles,
  index
}) => {
  const [options, setOptions] = useState<string[]>(field.options || []);
  const defaultFormRequired = useSelector(
    (state: RootState) =>
      state.formField.formSettings?.defaults.makeAllQuestionsRequire
  ) as boolean;
  const defaultRequired = defaultFormRequired || field.required;
  const rendorAnswerType = (type: string) => {
    if (type == "Short answer") {
      return (
        <Short_answer
          required={defaultRequired}
          fieldId={field.id}
          validation={field.validation}
        />
      );
    } else if (type == "Paragraph") {
      return (
        <Paragraph
          required={defaultRequired}
          fieldId={field.id}
          validation={field.validation}
        />
      );
    } else if (type == "Multiple choice") {
      return (
        <Multiple_choice
          fieldId={field.id}
          options={options}
          required={defaultRequired}
          isOther={field.isOther as boolean}
        />
      );
    } else if (type == "Drop-down") {
      return (
        <DropDown
          options={options}
          required={defaultRequired}
          fieldId={field.id}
        />
      );
    } else if (type === "Checkboxes") {
      return (
        <Checkboxes
          fieldId={field.id}
          options={options}
          required={defaultRequired}
          isOther={field.isOther as boolean}
          validation={field.validation}
        />
      );
    } else if (type == "File upload") {
      return (
        <FileUpload
          required={defaultRequired}
          fieldId={field.id}
          fileValidation={field.fileValidation}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      );
    } else if (type == "Date") {
      return (
        <Date
          showIncludeTime={field.isTime as boolean}
          required={defaultRequired}
          fieldId={field.id}
        />
      );
    } else if (type == "Time") {
      return (
        <Time required={defaultRequired} fieldId={field.id} />
      );
    } else if (type == "Range") {
      return (
        <Range
          required={defaultRequired}
          fieldId={field.id}
          minValue={field.minValue as number}
          maxValue={field.maxValue as number}
          step={field.step as number}
        />
      );
    } else {
      <></>;
    }
  };

  if(field.type === "Title and description"){
    return  <ResponseHeader field={field} />
  }else if(field.type === "Internal Title and Description"){
return <InternalTitleAndDescription field={field}/>
  }else{
    return(
      <div className="relative bg-white container max-w-2xl rounded-xl">
        <div className="p-7 w-full  rounded-lg space-y-4">
          {/* fixed : question  */}
          <div className=" w-full">
            <QuestionDisplay
              text_size="18"
              label={field.label}
              required={defaultRequired}
              index={index}
            />
          </div>
  
          {field.description && (
            <QuestionDisplay text_size="15" label={field.description as string} />
          )}
  
          {field.imageUrlKey && (
            <div className={`flex items-center ${field.imageSettings?.align}`}>
              <Image
                src={
                  field.imageUrlKey
                    ? `${process.env.NEXT_PUBLIC_AWS_IMAGE_CDN}/${field.imageUrlKey}`
                    : ""
                }
                width={field.imageSettings?.width}
                height={field.imageSettings?.height}
                alt="image"
                priority
              />
            </div>
          )}
          {/* dynamic : question answer  */}
          {rendorAnswerType(field.type)}
        </div>
      </div>
    )
  }
};

export default GenricFormResponse;
