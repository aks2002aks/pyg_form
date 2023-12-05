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
import {
  handleDropField,
  setFormName,
} from "@/redux/features/formField/formFieldSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsFillEyeFill } from "react-icons/bs";
import { MdPublish } from "react-icons/md";
import { FaFileWaveform } from "react-icons/fa6";
import Link from "next/link";
import ShareModal from "../modal/shareModal";

const CreateForm = () => {
  const dispatch = useDispatch();
  const formFields = useSelector((state: RootState) => state.formFields);
  const allFormFields = useSelector((state: RootState) => state);
  const [isBrowser, setIsBrowser] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const formid = useSearchParams().get("formid");
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

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
        console.error("Failed to edit question form.");
      }
    } catch (error) {
      console.error("Error editing question form:", error);
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
  const handleFormNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormName(event.target.value));
  };

  const handleFormNameBlur = async () => {
    // Call API to set the form name
    // Example: api.setFormName(allFormFields.formName)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setFormName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            formName: allFormFields.formName,
            formId: formid,
          }),
        }
      );

      const { success } = await res.json();

      if (!success) {
        console.error("Failed to edit question form name.");
      }
    } catch (error) {
      console.error("Error editing question form name:", error);
    }
  };

  const handlePublishForm = async () => {
    setLoading(true);
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/publishQuestionForm`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: session?.user?.id,
    //         formId: formid,
    //       }),
    //     }
    //   );

    //   const { success } = await res.json();

    //   if (!success) {
    //     console.error("Failed to publish question form.");
    //   }
    // } catch (error) {
    //   console.error("Error publishing question form:", error);
    // }
    setLoading(false);
    setOpenShare(true)
  };

  return (
    <>
      <ShareModal
        openShare={openShare}
        setOpenShare={setOpenShare}
        postId={formid as string}
      />
      <div className="flex justify-between items-center  border-b md:p-5 p-3">
        <div className="flex  items-center overflow-x-auto whitespace-nowrap ">
          <FaFileWaveform size={25} />
          <input
            type="text"
            className="focus:border-b focus:border-black focus:outline-none  w-full  py-1 text-xl  mr-4 ml-2"
            value={allFormFields.formName}
            onChange={handleFormNameChange}
            onBlur={handleFormNameBlur}
          />
        </div>
        <div className="flex space-x-4">
          <Link href={`/forms/form?formid=${formid}`} target="_blank">
            <BsFillEyeFill
              size={35}
              className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
            />{" "}
          </Link>

          <MdPublish
            size={35}
            className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
            onClick={handlePublishForm}
          />
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 pb-20">
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
        <button
          className="fixed bottom-20 z-20 right-4 bg-red-200 hover:bg-red-400  py-2 px-4 rounded-full"
          onClick={handleSaveEdit}
        >
          {loading ? <div className="animate-spin">🔄</div> : "Save"}
        </button>
      </div>
    </>
  );
};

export default CreateForm;
