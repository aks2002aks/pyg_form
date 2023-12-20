import React from "react";
import QuestionDisplay from "../all_types_components/question_display";


interface FormField {
  label: string;
  description?: string;
}

const InternalTitleAndDescription = ({ field }: { field: FormField }) => {
  
  return (
    <>
      <div className="bg-white container max-w-2xl rounded-xl border-t-8 border-t-red-200">
        <div className="p-7 w-full rounded-lg space-y-4">
          <QuestionDisplay text_size="25" label={field.label} />
          <QuestionDisplay text_size="13" label={field.description as string}/>
        </div>
      </div>
    </>
  );
};

export default InternalTitleAndDescription;
