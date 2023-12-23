import Modal from "react-modal";
import toast from "react-hot-toast";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleIsPublicChange } from "@/redux/features/formField/formFieldSlice";
import { RootState } from "@/redux/store/store";
import { useSession } from "next-auth/react";

export default function ShareModal({
  openShare,
  setOpenShare,
  postId,
}: {
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}) {
  const isPublic = useSelector((state: RootState) => state.formField.isPublic);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleToggle = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setIsPublished`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formId: postId,
        userId: session?.user?.id,
        isPublic: !isPublic,
      }),
    });
    dispatch(
      handleIsPublicChange({
        isPublic: !isPublic,
      })
    );
  };

  return (
    <div>
      {openShare && (
        <Modal
          isOpen={openShare}
          onRequestClose={() => setOpenShare(false)}
          className="max-w-sm w-[70%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md "
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5 flex justify-between items-center">
              <div
                onClick={() => setOpenShare(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <RxCross2 className="h-[23px] text-gray-700 p-0" />
              </div>
              <div className="flex">
                <div className="flex items-center space-x-2">
                  <label
                    className={`inline-block pl-[0.15rem] hover:cursor-pointer ${
                      !isPublic ? "font-bold" : ""
                    }`}
                  >
                    Private
                  </label>
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={isPublic}
                    onChange={handleToggle}
                  />
                  <label
                    className={`inline-block pl-[0.15rem] hover:cursor-pointer ${
                      isPublic ? "font-bold" : ""
                    }`}
                  >
                    Public
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly space-x-4">
              <EmailShareButton
                subject="Shared a Pyg Form With you"
                body={`Link to the Post is :`}
                url={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
              >
                <EmailIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></EmailIcon>
              </EmailShareButton>
              <WhatsappShareButton
                title="Shared a Pyg Form With you"
                url={`http://localhost:3000/forms/form?formid=${postId}`}
              >
                <WhatsappIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></WhatsappIcon>
              </WhatsappShareButton>

              <FacebookShareButton
                hashtag="Shared a Pyg Form With you"
                url={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
              >
                <FacebookIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></FacebookIcon>
              </FacebookShareButton>

              <TwitterShareButton
                title="Shared a Pyg Form With you"
                url={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
              >
                <TwitterIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></TwitterIcon>
              </TwitterShareButton>

              <RedditShareButton
                title="Shared a Pyg Form With you"
                url={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
              >
                <RedditIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></RedditIcon>
              </RedditShareButton>

              <TelegramShareButton
                title="Shared a Pyg Form With you"
                url={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
              >
                <TelegramIcon
                  className="mt-2 mb-2"
                  size={32}
                  round={true}
                ></TelegramIcon>
              </TelegramShareButton>
            </div>

            <div className="border-t border-gray-200 py-2 px-1.5 ">
              <div className="flex flex-wrap items-center">
                <input
                  type="text"
                  value={`${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`}
                  readOnly
                  className=" w-full mr-2 mb-2 focus:outline-none focus:border-b focus:border-black"
                ></input>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-auto hover:brightness-75 text-xs"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(
                        `${process.env.NEXT_PUBLIC_HOSTED_URL}/forms/form?formid=${postId}`
                      )
                      .then(
                        () => {
                          toast.success("Text copied to clipboard");
                          setOpenShare(false);
                        },
                        (err) => {
                          toast.success("Could not copy text");
                        }
                      );
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
