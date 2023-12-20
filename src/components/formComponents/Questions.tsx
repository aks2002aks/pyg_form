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
import { handleDropField } from "@/redux/features/formField/formFieldSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ShareModal from "../modal/shareModal";
import toast from "react-hot-toast";

const CreateForm = () => {
  const dispatch = useDispatch();
  const formFields = useSelector(
    (state: RootState) => state.formField.formFields
  );

  const [isBrowser, setIsBrowser] = useState(false);

  const formid = useSearchParams().get("formid");
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  const handleSaveEdit = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/editQuestionForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            formFields: formFields,
            formId: formid,
          }),
        }
      );

      const { success, id } = await res.json();

      if (!success) {
        toast.error("Failed to edit question form.");
      } else {
        toast.success("Saved SucessFully");
      }
    } catch (error) {
      toast.error("Error editing question form:" + error);
    }
    setLoading(false);
  };

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
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center pt-3 p-4 md:pl-12 md:pr-12 md:pb-12 pb-20 cursor-default">
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
                                  handleSaveEdit={handleSaveEdit}
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
        <button
          className="fixed bottom-20 z-20 right-4 bg-red-200 hover:bg-red-400  py-2 px-4 rounded-full"
          onClick={handleSaveEdit}
        >
          {loading ? (
            <div className="flex items-center space-x-2 ">
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
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
