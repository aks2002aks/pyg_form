import React, { useEffect, useState } from "react";
import CardSkeleton from "./cardSkeleton";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Link from "next/link";
import {useSession} from "next-auth/react";

const Card = ({ responseId }: { responseId: string }) => {
  const {data:session}= useSession();
  const [singleResponse, setSingleResponse] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getResponseByResponseId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            responseId: responseId,
          }),
        }
      );
      const resp = await res.json();
      setSingleResponse(resp.response);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fecthData();
  }, [responseId, session?.user.accessToken]);

  return (
    <div className="p-5 pr-0">
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-bold">Question</div>
            <div className="font-bold">Answer</div>
            {singleResponse?.formResponses?.map((r: any, index: number) => (
              <React.Fragment key={index}>
                <div className="flex ">
                  <span>Q. </span>
                  <div dangerouslySetInnerHTML={{ __html: r.label }} />
                </div>
                <div className="">
                  <div>
                    {Array.isArray(r.answer) ? (
                      <div className="grid grid-cols-2">
                        {r.answer.map((value: any, idx: number) => (
                          <div key={idx}>{value}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center w-full">
                        <p className="pr-2">{r.answer}</p>
                        {r.fileUrlKey && (
                          <Link
                            href={
                              process.env.NEXT_PUBLIC_AWS_IMAGE_CDN +
                              "/" +
                              r.fileUrlKey
                            }
                            target="_blank"
                            className="cursor-pointer"
                          >
                            <AiOutlineCloudDownload size={30} />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
