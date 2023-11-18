"use client";

import AddComponent from "@/components/createComponents/all_types_components/add_component";
import Genric_Question_Creation from "@/components/createComponents/all_types_components/genric_question_creation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

function Page() {
  console.log("Page component rendering");
  const allformFields = useSelector((state: RootState) => state);
  const formFields = useSelector((state: RootState) => state.formFields);

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  return (
    <main className=" bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 pb-20">
      {formFields.map((field, index) => (
        <div
          key={field.id}
          className="relative flex w-full justify-center items-center max-w-4xl"
        >
          <div className="flex w-full justify-center">
            <Genric_Question_Creation field={field} index={index} />
          </div>

          {field.focus && (
            <div className="absolute right-0">
              <AddComponent />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default Page;
