"use client";

import AddComponent from "@/components/createComponents/all_types_components/add_component";
import Genric_Question_Creation from "@/components/createComponents/all_types_components/genric_question_creation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

function Page() {
  const allformFields = useSelector((state: RootState) => state);
  const formFields = useSelector((state: RootState) => state.formFields);
  const [focusFields, setFocusFields] = useState<boolean[]>([false, true]);

  useEffect(() => {
    console.log(allformFields);
  }, [allformFields]);

  const setFocus = (index: number, focus: boolean) => {
    const newFocusFields = focusFields.map((_, i) =>
      i === index ? true : false
    );

    setFocusFields(newFocusFields);
  };

  return (
    <main className=" bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 pb-20">
      {formFields.map((field, index) => (
        <div
          key={field.id}
          className="relative flex w-full justify-center items-center max-w-4xl"
        >
          <div className="flex w-full justify-center">
            <Genric_Question_Creation
              focus={focusFields[index]}
              field={field}
              index={index}
              setFocus={setFocus}
              focusFields={focusFields}
                setFocusFields={setFocusFields}
            />
          </div>

          {focusFields[index] && (
            <div className="absolute right-0">
              <AddComponent
                focusFields={focusFields}
                setFocusFields={setFocusFields}
              />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default Page;
