"use client";

import React, { use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useSession } from "next-auth/react";
import { setAllFormFields } from "@/redux/features/formField/formFieldSlice";
import FillResponse from "@/components/formComponents/FillResponse";
import { addFormFieldResponse } from "@/redux/features/responseField/responseFieldSlice";
import AccessDenied from "@/components/access_denied/access_denied";
import SubmitResponse from "@/components/submitcomponent/submitResponse";
import Link from "next/link";

interface formFields {
  type: string;
  id: string;
  label: string;
  focus: boolean;
  options?: string[];
  isOther?: boolean;
  description?: string;
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

const ResponsePage = () => {
  const dispatch = useDispatch();
  const formId = useSearchParams().get("formid");
  const isPublic = useSelector((state: RootState) => state.formField.isPublic);
  const formUserId = useSelector((state: RootState) => state.formField.userId);
  const formSettings = useSelector(
    (state: RootState) => state.formField.formSettings
  );
  const formName = useSelector((state: RootState) => state.formField.formName);
  const accessByRole = useSelector(
    (state: RootState) => state.formField.accessByRole
  ) as string[];

  const { data: session } = useSession();
  const [userResponded, setUserResponded] = React.useState(false);
  const [ResponseId, setResponseId] = React.useState("");
  useEffect(() => {
    //TODO: fetch if previous response then send to edit reponse page

    const fetchFormFields = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getFormById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            formId: formId,
          }),
        }
      );

      const { success, form } = await res.json();

      if (success) {
        dispatch(setAllFormFields(form));
        form.formFields.forEach((field: formFields) => {
          if (
            !(
              field.type === "Title and description" ||
              field.type === "Internal Title and Description"
            )
          ) {
            dispatch(
              addFormFieldResponse({
                formFieldId: field.id,
                type: field.type,
                required: field.required,
                showIncludeTime: field.isTime as boolean,
                label: field.label,
                description: field.description ?? "",
                imageUrlKey: field.imageUrlKey ?? "",
                imageSettings: field.imageSettings ?? {
                  width: 0,
                  height: 0,
                  align: "",
                },
              })
            );
          }
        });
      }
    };

    fetchFormFields();
  }, [
    dispatch,
    formId,
    session?.user.accessToken,
    session?.user.firstName,
    session?.user.id,
  ]);

  const acceptingResponse = useSelector(
    (state: RootState) => state.formField.acceptingResponses
  ) as boolean;

  const acceptingResponseTill = useSelector(
    (state: RootState) => state.formField.acceptingResponsesTill
  ) as string;

  // check if response is already present for the user
  useEffect(() => {
    const checkIfResponsePresent = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkUserResponse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            userId: session?.user.id,
          }),
        }
      );
      const resp = await res.json();
      setUserResponded(resp.success);
      setResponseId(resp.id);
    };

    checkIfResponsePresent();
  }, [session?.user.accessToken, session?.user.id]);

  function isEmpty(str: string | undefined | null): boolean {
    return !str || str.length === 0 || str === undefined || str === null;
  }

  if (formId) {
    if (
      isPublic ||
      formUserId === session?.user?.id ||
      session?.user?.role === "admin"
    ) {
      if (
        acceptingResponse &&
        (!isEmpty(acceptingResponseTill)
          ? new Date(acceptingResponseTill) > new Date()
          : true)
      ) {
        // if form accepting
        if (formSettings.response.collectEmailAddresses === "Verified") {
          if (
            session?.user?.role &&
            accessByRole.includes(session.user.role as string)
          ) {
            if (session?.user?.isEmailVerified) {
              if (formSettings?.response.limitToOneResponsePerPerson) {
                // check if user already submitted the response or not
                if (userResponded) {
                  // if user already submitted the response
                  return (
                    <SubmitResponse>
                      <div className="p-7 w-full rounded-lg space-y-4">
                        <h1 style={{ fontSize: "35px" }}>{formName}</h1>
                        <p>Your Response is already submitted.</p>
                        <p>
                          Try contacting the owner of the form if you think that
                          this is a mistake.
                        </p>
                        {formSettings?.response.allowResponseEditing && (
                          <div className="mt-3">
                            <Link
                              href={`/forms/editResponse?formid=${formId}&responseid=${ResponseId}`}
                              className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
                            >
                              Edit Your Response
                            </Link>
                          </div>
                        )}
                      </div>
                    </SubmitResponse>
                  );
                } else {
                  return (
                    <div>
                      <FillResponse />
                    </div>
                  );
                }
              } else {
                return (
                  <div>
                    <FillResponse />
                  </div>
                );
              }
            } else {
              return (
                <SubmitResponse>
                  <div className="p-7 w-full rounded-lg space-y-4">
                    <h1 style={{ fontSize: "35px" }}>{formName}</h1>
                    <p>
                      The Access to form{" "}
                      <span className="font-semibold">{formName}</span> is
                      restricted to verified users only. Go to your profile and
                      verify your email address.{" "}
                      <Link
                        href={"/profile"}
                        className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
                      >
                        profile
                      </Link>
                    </p>

                    <p>
                      Try contacting the owner of the form if you think that
                      this is a mistake.
                    </p>
                  </div>
                </SubmitResponse>
              );
            }
          } else {
            return (
              <SubmitResponse>
                <div className="p-7 w-full rounded-lg space-y-4">
                  <h1 style={{ fontSize: "35px" }}>{formName}</h1>
                  <p>
                    The Access to form{" "}
                    <span className="font-semibold">{formName}</span> is
                    restricted to verified users only with specfic role. Login
                    with a Accesible Account to access the form.{" "}
                    <Link
                      href={"/user/login"}
                      className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
                    >
                      Login
                    </Link>
                  </p>

                  <p>
                    Try contacting the owner of the form if you think that this
                    is a mistake.
                  </p>
                </div>
              </SubmitResponse>
            );
          }
        } else {
          if (formSettings?.response.limitToOneResponsePerPerson) {
            // check if user already submitted the response or not
            if (userResponded) {
              // if user already submitted the response
              return (
                <SubmitResponse>
                  <div className="p-7 w-full rounded-lg space-y-4">
                    <h1 style={{ fontSize: "35px" }}>{formName}</h1>
                    <p>Your Response is already submitted.</p>
                    <p>
                      Try contacting the owner of the form if you think that
                      this is a mistake.
                    </p>
                    {formSettings?.response.allowResponseEditing && (
                      <div className="mt-3">
                        <Link
                          href={`/forms/editResponse?formid=${formId}&responseid=${ResponseId}`}
                          className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
                        >
                          Edit Your Response
                        </Link>
                      </div>
                    )}
                  </div>
                </SubmitResponse>
              );
            } else {
              return (
                <div>
                  <FillResponse />
                </div>
              );
            }
          } else {
            return (
              <div>
                <FillResponse />
              </div>
            );
          }
        }
      } else {
        return (
          <SubmitResponse>
            <div className="p-7 w-full rounded-lg space-y-4">
              <h1 style={{ fontSize: "35px" }}>{formName}</h1>
              <p>
                The form <span className="font-semibold">{formName}</span> is no
                longer accepting responses.
              </p>
              <p>
                Try contacting the owner of the form if you think that this is a
                mistake.
              </p>
            </div>
          </SubmitResponse>
        );
      }
    } else {
      return (
        <SubmitResponse>
          <div className="p-7 w-full rounded-lg space-y-4">
            <h1 style={{ fontSize: "35px" }}>{formName}</h1>
            <p>
              The form <span className="font-semibold">{formName}</span> is no
              longer accessible.
            </p>

            <p>
              Try contacting the owner of the form if you think that this is a
              mistake.
            </p>
          </div>
        </SubmitResponse>
      );
    }
  } else {
    return (
      <>
        <AccessDenied />
      </>
    );
  }
};

export default ResponsePage;
