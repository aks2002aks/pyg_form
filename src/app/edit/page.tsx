// http://localhost:3000/create?formid=184y418481491y324y

"use client";

import AddComponent from "@/components/createComponents/all_types_components/add_component";
import Genric_Question_Creation from "@/components/createComponents/all_types_components/genric_question_creation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { handleDropField, setAllFormFields } from "@/redux/features/formField/formFieldSlice";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useSearchParams } from "next/navigation";


const myformData = {
  _id: "5fc5bf01f25eeea23c5fe6d6",
  formFields: [
    {
      type: "Title and description",
      id: "some-unique-id-4",
      label: "My Second Form",
      required: false,
      focus: false,
    },
    {
      type: "Paragraph",
      id: "some-unique-id-5",
      label: "Share your thoughts on the following topic",
      required: true,
      focus: true,
    },
    {
      type: "Checkboxes",
      id: "some-unique-id-6",
      label: "Select your hobbies",
      options: ["Reading", "Traveling", "Sports"],
      required: false,
      focus: false,
    },
    {
      type: "File upload",
      id: "some-unique-id-9",
      label: "Upload your resume",
      required: true,
      focus: false,
    },
    {
      type: "Time",
      id: "some-unique-id-10",
      label: "Select your preferred time",
      required: false,
      focus: false,
    },
  ],
  userId: "12345678",
  user: "Ashwani",
};

function Page() {
  const dispatch = useDispatch();
  const allformFields = useSelector((state: RootState) => state);
  const formFields = useSelector((state: RootState) => state.formFields);
  const [isBrowser, setIsBrowser] = useState(false);
  const formid = useSearchParams().get("formid");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
    if (isBrowser) {
      // Dispatch the setAllFormFields action with your initial data
      dispatch(setAllFormFields(myformData));
    }
  }, [dispatch, isBrowser]);

  useEffect(() => {
    console.log(allformFields);
  }, [allformFields]);

  const handleDragAndDrop = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (type === "group") {
      dispatch(
        handleDropField({
          source: source.index,
          destination: destination.index,
        })
      );
      console.log(type, source, destination);
    }
    console.log(result);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <main className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 pb-20">
      <DragDropContext onDragEnd={handleDragAndDrop}>
        {isBrowser ? (
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full flex flex-col space-y-4 justify-center items-center"
              >
                
                {formFields.map((field, index) => (
                  <Draggable
                    draggableId={field.id}
                    index={index}
                    key={field.id}
                    isDragDisabled={isDragging}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="relative flex w-full justify-center items-center max-w-4xl"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {snapshot.isDragging ? null : (
                          <>
                            <div className="flex w-full justify-center">
                              <Genric_Question_Creation
                                field={field}
                                index={index}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                              />
                            </div>

                            {field.focus && (
                              <div className="absolute right-0">
                                <AddComponent />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    </main>
  );
}

export default Page;
