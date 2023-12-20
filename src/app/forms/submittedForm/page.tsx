"use client";

import SubmitResponse from "@/components/submitcomponent/submitResponse";
import { RootState } from "@/redux/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const formName = useSelector((state: RootState) => state.formField.formName);

  const confirmationMessage = useSelector(
    (state: RootState) =>
      state.formField.formSettings.presentation.confirmationMessage
  );

  const showLinkToSubmitAnotherResponse = useSelector(
    (state: RootState) =>
      state.formField.formSettings.presentation.showLinkToSubmitAnotherResponse
  );

  const allowResponseEditing = useSelector(
    (state: RootState) =>
      state.formField.formSettings.response.allowResponseEditing
  );
  const formid = useSearchParams().get("formid");
  const responseid = useSearchParams().get("responseid");
  return (
    <SubmitResponse>
      <div className="p-7 w-full rounded-lg space-y-4">
        <h1 style={{ fontSize: "35px" }}>{formName}</h1>
        <p>{confirmationMessage}</p>
        {allowResponseEditing && (
          <div className="mt-3">
            <Link
              href={`/forms/editResponse?formid=${formid}&responseid=${responseid}`}
              className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
            >
              Edit Your Response
            </Link>
          </div>
        )}
        {showLinkToSubmitAnotherResponse && (
          <div className="mt-3">
            <Link
              href={`/forms/form?formid=${formid}`}
              className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
            >
              Submit Another Response
            </Link>
          </div>
        )}

        <div className="mt-3">
          <Link
            href={`/`}
            className="text-sm text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </SubmitResponse>
  );
};

export default Page;
