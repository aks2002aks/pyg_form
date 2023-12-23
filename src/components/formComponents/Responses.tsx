import React, { useEffect, useState } from "react";
import ViewResponseHeader from "../viewResponses/viewResponseHeader";
import { useSearchParams } from "next/navigation";
import VerifiedResponseViewer from "../viewResponses/verifiedResponseViewer";
import UnverifiedResponseViewer from "../viewResponses/unverifiedResponseViewer";
import SearchResposne from "../viewResponses/searchResponse";

interface responses {
  formId: string;
  userId?: string;
  userName?: string;
  email?: string;
  _id: string;
  submittedAt: string;
}

const Responses = () => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [loading, setLoading] = useState(false);
  const formId = useSearchParams().get("formid");
  const [allResponses, setAllResponses] = useState<responses[]>([]);
  const [allVerifiedResponses, setAllVerifiedResponses] = useState<responses[]>(
    []
  );
  const [allUnVerifiedResponses, setAllUnVerifiedResponses] = useState<
    responses[]
  >([]);
  const [activeTab, setActiveTab] = useState("individual");

  useEffect(() => {
    const getAllResponses = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getResponsesByFormId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formId,
          }),
        }
      );
      const resp = await res.json();
      setAllResponses(resp.response);

      const verifiedResponses = resp.response.filter(
        (response: { userId: string }) => response.userId
      );
      const unverifiedResponses = resp.response.filter(
        (response: { userId: string }) => !response.userId
      );
      setAllVerifiedResponses(verifiedResponses);
      setAllUnVerifiedResponses(unverifiedResponses);
    };
    getAllResponses();
  }, [formId]);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      {loadingSkeleton && <></>}
      <div className="rounded w-full ">
        <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:pl-12 md:pr-12 pt-4 pb-5">
          <div className="w-full flex flex-col space-y-4 justify-center items-center">
            <ViewResponseHeader
              TotalResponses={allResponses.length}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            {activeTab === "individual" && (
              <>
                {allVerifiedResponses.length > 0 && (
                  <VerifiedResponseViewer
                    allVerifiedResponses={allVerifiedResponses}
                  />
                )}

                {allUnVerifiedResponses.length > 0 && (
                  <UnverifiedResponseViewer
                    allUnVerifiedResponses={allUnVerifiedResponses}
                  />
                )}
              </>
            )}

            {activeTab === "search" && <SearchResposne />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Responses;
