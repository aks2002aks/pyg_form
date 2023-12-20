import React, { use, useEffect, useState } from "react";
import QuestionDisplay from "./question_display";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { BsEnvelopeXFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  saveEmail,
  saveUserId,
  saveUserName,
} from "@/redux/features/responseField/responseFieldSlice";

interface FormField {
  label: string;
  description?: string;
}

const ResponseHeader = ({ field }: { field: FormField }) => {
  const dispatch = useDispatch();
  const formFields = useSelector(
    (state: RootState) => state.formField.formFields
  );

  const formSettings = useSelector(
    (state: RootState) => state.formField.formSettings
  );

  const { data: session, status } = useSession();

  const [isRequred, setIsRequired] = useState<boolean>(false);

  useEffect(() => {
    if (formFields.length > 1) {
      formFields.map((formField) => {
        if (formField.required) {
          setIsRequired(formField.required);
        }
      });
    }
  }, [formFields]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(saveEmail(e.target.value));
  };

  useEffect(() => {
    if (
      status === "authenticated" &&
      formSettings?.response?.collectEmailAddresses === "Verified"
    ) {
      dispatch(saveEmail(session?.user?.email as string));
      dispatch(saveUserId(session?.user?.id as string));
      dispatch(
        saveUserName(
          ((session?.user?.firstName as string) +
            " " +
            session?.user?.lastName) as string as string
        )
      );
    }
  }, [
    dispatch,
    formSettings?.response?.collectEmailAddresses,
    session?.user?.email,
    session?.user?.firstName,
    session?.user?.id,
    session?.user?.lastName,
    status,
  ]);

  return (
    <>
      <div className="bg-white container max-w-2xl rounded-xl border-t-8 border-t-red-200">
        <div className="p-7 w-full rounded-lg space-y-4">
          <QuestionDisplay text_size="35" label={field.label} />
          <QuestionDisplay text_size="15" label={field.description as string}/>
        </div>
        {formSettings?.response?.collectEmailAddresses === "Verified" && (
          <div className="border-t px-7 py-3 w-full text-gray-600 text-sm">
            <div className="">
              {status === "authenticated" &&
                `Logged in as : ${session.user.email}`}
            </div>
            <div className="pt-2">
              {formSettings?.response?.collectEmailAddresses === "Verified" &&
                status === "authenticated" && (
                  <div className="flex items-center space-x-3">
                    <BsEnvelopeCheckFill size={20} />
                    <p> Shared</p>
                  </div>
                )}
            </div>
          </div>
        )}

        {formSettings?.response?.collectEmailAddresses === "do not collect" && (
          <div className="border-t px-7 py-3 w-full text-gray-600 text-sm">
            <div className="">
              {status === "authenticated" &&
                `Logged in as : ${session.user.email}`}
            </div>
            <div className="pt-2">
              {formSettings?.response?.collectEmailAddresses ===
                "do not collect" && (
                  <div className="flex items-center space-x-3">
                    <BsEnvelopeXFill size={20} />
                    <p> Not Shared</p>
                  </div>
                )}
            </div>
          </div>
        )}

        {isRequred && (
          <div className="border-t text-red-500 px-7 py-3 w-full">
            * Indicates required question
          </div>
        )}
      </div>

      {formSettings?.response?.collectEmailAddresses === "Responder input" && (
        <div className="bg-white container max-w-2xl rounded-xl">
          <div className="p-7 w-full rounded-lg space-y-4">
            <div className="">
              <p>
                Email <span className="pl-1 text-red-700">*</span>
              </p>
            </div>
            <div className="">
              <input
                type="email"
                className="border-b outline-none"
                placeholder="Your email address"
                required
                onBlur={handleEmailChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponseHeader;
