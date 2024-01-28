import { RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface FormSettings {
  response: {
    collectEmailAddresses: string;
    limitToOneResponsePerPerson: boolean;
    allowResponseEditing: boolean;
  };
  presentation: {
    showLinkToSubmitAnotherResponse: boolean;
    confirmationMessage: string;
  };
  defaults: {
    makeAllQuestionsRequire: boolean;
  };
}

interface Option {
  label: string;
  value: string | boolean;
}

const Settings = () => {
  const { data: session } = useSession();
  const formId = useSelector((state: RootState) => state.formField._id);
  const settings = useSelector(
    (state: RootState) => state.formField.formSettings
  );

  const defaultFormSettings: FormSettings = {
    response: {
      collectEmailAddresses: settings.response.collectEmailAddresses,
      limitToOneResponsePerPerson:
        settings.response.limitToOneResponsePerPerson,
      allowResponseEditing: settings.response.allowResponseEditing,
    },
    presentation: {
      showLinkToSubmitAnotherResponse:
        settings.presentation.showLinkToSubmitAnotherResponse,
      confirmationMessage: settings.presentation.confirmationMessage,
    },
    defaults: {
      makeAllQuestionsRequire: settings.defaults.makeAllQuestionsRequire,
    },
  };

  const [formSettings, setFormSettings] =
    useState<FormSettings>(defaultFormSettings);

  const [showResponsesSetting, setShowResponsesSetting] = useState(false);
  const [showPresentationSetting, setShowPresentationSetting] = useState(false);
  const [showDefaultSetting, setShowDefaultSetting] = useState(false);
  const [showConfirmationEdit, setShowConfirmationEdit] = useState(false);
  const [editText, setEditText] = useState(
    formSettings.presentation.confirmationMessage
  );
  const [loading, setLoading] = useState(false);

  const options: Record<string, Option[]> = {
    collectEmailAddresses: [
      { label: "Do not collect", value: "do not collect" },
      { label: "Verified", value: "Verified" },
      { label: "Responder input", value: "Responder input" },
    ],
  };

  const handleSelectChange = (
    category: keyof FormSettings["response"],
    value: string | boolean
  ): void => {
    if (value !== "verified") {
      setFormSettings((prevSettings) => ({
        ...prevSettings,
        response: {
          ...prevSettings.response,
          [category]: value,
          allowResponseEditing: false,
          limitToOneResponsePerPerson: false,
        },
      }));
    } else {
      setFormSettings((prevSettings) => ({
        ...prevSettings,
        response: {
          ...prevSettings.response,
          [category]: value,
        },
      }));
    }
  };

  const handleAllowResponseEditingToggle = () => {
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      response: {
        ...prevSettings.response,
        allowResponseEditing: !prevSettings.response.allowResponseEditing,
      },
    }));
  };

  const handleLimitToOneResponsePerPersonToggle = () => {
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      response: {
        ...prevSettings.response,
        limitToOneResponsePerPerson:
          !prevSettings.response.limitToOneResponsePerPerson,
      },
    }));
  };

  const handleShowLinkToSubmitAnotherResponseToggle = () => {
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      presentation: {
        ...prevSettings.presentation,
        showLinkToSubmitAnotherResponse:
          !prevSettings.presentation.showLinkToSubmitAnotherResponse,
      },
    }));
  };

  const handleMakeAllQuestionsRequireToggle = () => {
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      defaults: {
        ...prevSettings.defaults,
        makeAllQuestionsRequire: !prevSettings.defaults.makeAllQuestionsRequire,
      },
    }));
  };

  const handleSaveEditTextChange = () => {
    setFormSettings((prevSettings) => ({
      ...prevSettings,
      presentation: {
        ...prevSettings.presentation,
        confirmationMessage: editText,
      },
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleSaveSettings = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/setFormSettings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            formId: formId,
            formSettings: formSettings,
          }),
        }
      );

      const { success } = await res.json();

      if (!success) {
        toast.error("Failed to save form settings.");
      } else {
        toast.success("Saved form settings.");
      }
    } catch (error) {
      toast.error("Error editing question form name:" + error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 flex flex-col space-y-4 justify-center items-center pt-3 p-4 md:pl-12 md:pr-12 md:pb-12 pb-20 cursor-default">
      <div className="w-full flex flex-col space-y-4 justify-center items-center">
        <div className="relative bg-white container max-w-3xl rounded-xl p-5">
          <div className="flex justify-between border-b pb-5">
            <div className=" font-extrabold text-lg">Settings</div>
            <button
              className=" bg-green-200 hover:bg-green-500  py-2 px-4 rounded-full"
              onClick={handleSaveSettings}
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                </div>
              ) : (
                "Apply"
              )}
            </button>
          </div>
          <div className="pl-5 pt-5">
            <div className="flex flex-col ">
              <div className="flex justify-between pb-5 border-b">
                <div className="w-2/3">
                  <h1 className="font-medium pb-1">Responses</h1>
                  <p className="text-sm text-gray-600">
                    Manage how responses are collected and protected
                  </p>
                </div>

                <div className="w-1/2 sm:w-auto flex justify-end items-center ">
                  <div
                    className={`flex justify-end items-center  ${
                      showResponsesSetting && "rotate-180"
                    }`}
                    onClick={() =>
                      setShowResponsesSetting(!showResponsesSetting)
                    }
                  >
                    <Image
                      src="/down-arrow-bounce.gif"
                      alt="arrow"
                      className="hover:bg-gray-200 rounded-full cursor-pointer"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>

              {showResponsesSetting && (
                <>
                  <div className="pl-5 pt-5 flex justify-between ">
                    <div className="">
                      <h1 className="font-medium pb-1">
                        Collect email addresses
                      </h1>
                      <p className="text-sm text-gray-600 md:h-5">
                        {formSettings.response.collectEmailAddresses ===
                          "Verified" &&
                          "Respondents will be required to sign in to PYG"}
                        {formSettings.response.collectEmailAddresses ===
                          "Responder input" &&
                          "Respondents will manually enter their email response"}
                      </p>
                    </div>
                    <div className="">
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        id="collectEmailAddresses"
                        value={formSettings.response.collectEmailAddresses}
                        onChange={(e) =>
                          handleSelectChange(
                            "collectEmailAddresses",
                            e.target.value
                          )
                        }
                      >
                        {options.collectEmailAddresses.map((option) => (
                          <option
                            key={option.value as string}
                            value={option.value as string}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="pl-5 pt-5 flex justify-between ">
                    <h1 className="text-sm text-gray-600 font-semibold">
                      REQUIRES SIGN-IN
                    </h1>
                  </div>
                  <div className="pl-5 pt-5 flex justify-between ">
                    <div className="">
                      <h1 className="font-medium pb-1">
                        Allow response editing
                      </h1>
                      {formSettings.response.collectEmailAddresses ===
                        "Verified" && (
                        <p className="text-sm text-gray-600 md:h-5">
                          Responses can be changed after being submitted
                        </p>
                      )}

                      {formSettings.response.collectEmailAddresses !==
                        "Verified" && (
                        <p className="text-sm text-gray-600 md:h-5">
                          Disabled , to allow response editing you need to
                          collect Verified email addresses
                        </p>
                      )}
                    </div>
                    <div className="">
                      <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={formSettings.response.allowResponseEditing}
                        onChange={handleAllowResponseEditingToggle}
                        disabled={
                          formSettings.response.collectEmailAddresses ===
                          "Verified"
                            ? false
                            : true
                        }
                      />
                    </div>
                  </div>

                  <div className="pl-5 pt-5 flex justify-between ">
                    <div className="">
                      <h1 className="font-medium pb-1">Limit to 1 response</h1>
                      {formSettings.response.collectEmailAddresses ===
                      "Verified" ? (
                        <p className="text-sm text-gray-600 md:h-5">
                          Respondents will be required to sign in to PYG.
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 md:h-5">
                          Disabled By <strong>Collect Email Addresses</strong>{" "}
                          Set it to <strong>Verified</strong> to enable
                        </p>
                      )}
                    </div>
                    <div className="">
                      <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={
                          formSettings.response.limitToOneResponsePerPerson
                        }
                        disabled={
                          formSettings.response.collectEmailAddresses ===
                          "Verified"
                            ? false
                            : true
                        }
                        onChange={handleLimitToOneResponsePerPersonToggle}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-between pt-5 pb-5 border-b">
                <div className="w-2/3">
                  <h1 className="font-medium pb-1">Presentation</h1>
                  <p className="text-sm text-gray-600 ">
                    Manage how the form and responses are presented
                  </p>
                </div>
                <div className="w-1/2 sm:w-auto flex justify-end items-center ">
                  <div
                    className={`flex justify-end items-center  ${
                      showPresentationSetting && "rotate-180"
                    }`}
                    onClick={() =>
                      setShowPresentationSetting(!showPresentationSetting)
                    }
                  >
                    <Image
                      src="/down-arrow-bounce.gif"
                      alt="arrow"
                      className="hover:bg-gray-200 rounded-full cursor-pointer"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>

              {showPresentationSetting && (
                <>
                  <>
                    <div className="pl-5 pt-5 flex justify-between ">
                      <div className="">
                        {!showConfirmationEdit ? (
                          <>
                            <h1 className="font-medium pb-1">
                              Confirmation message
                            </h1>
                            <p className="text-sm text-gray-600 pr-12">
                              {formSettings.presentation.confirmationMessage}
                            </p>
                          </>
                        ) : (
                          <div className="w-96">
                            <div className="relative w-full min-w-[200px] ">
                              <textarea
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 text-wrap"
                                value={editText}
                                onChange={handleTextChange}
                                wrap="soft" // or wrap="hard" depending on your preference
                                rows={2}
                              />

                              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                Confirmation message
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="">
                        {!showConfirmationEdit ? (
                          <button
                            className="text-red-600 hover:bg-red-100 p-2 rounded-md"
                            onClick={() => setShowConfirmationEdit(true)}
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              className="text-green-600 hover:bg-green-100 p-2 rounded-md"
                              onClick={() => {
                                handleSaveEditTextChange();
                                setShowConfirmationEdit(false);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="text-red-600 hover:bg-red-100 p-2 rounded-md"
                              onClick={() => setShowConfirmationEdit(false)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="pl-5 pt-5 flex justify-between ">
                      <div className="">
                        <h1 className="font-medium pb-1">
                          Show link to submit another response
                        </h1>
                        <p className="text-sm text-gray-600 md:h-5">
                          {formSettings.response
                            .limitToOneResponsePerPerson && (
                            <>
                              Disabled by <strong>Limit to 1 response</strong>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="">
                        <input
                          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          disabled={
                            formSettings.response.limitToOneResponsePerPerson
                              ? true
                              : false
                          }
                          checked={
                            formSettings.presentation
                              .showLinkToSubmitAnotherResponse
                          }
                          onChange={handleShowLinkToSubmitAnotherResponseToggle}
                        />
                      </div>
                    </div>
                  </>
                </>
              )}
              <div
                className={`flex justify-between pt-5 pb-5 ${
                  showDefaultSetting && "border-b"
                }`}
              >
                <div className="w-2/3">
                  <h1 className="font-medium pb-1">Question defaults</h1>
                  <p className="text-sm text-gray-600 ">
                    Settings applied to all new questions
                  </p>
                </div>

                <div className="w-1/2 sm:w-auto flex justify-end items-center ">
                  <div
                    className={`flex justify-end items-center  ${
                      showDefaultSetting && "rotate-180"
                    }`}
                    onClick={() => setShowDefaultSetting(!showDefaultSetting)}
                  >
                    <Image
                      src="/down-arrow-bounce.gif"
                      alt="arrow"
                      className="hover:bg-gray-200 rounded-full cursor-pointer"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>
              {showDefaultSetting && (
                <>
                  <div className="pl-5 pt-5 flex justify-between ">
                    <div className="">
                      <h1 className="font-medium pb-1">
                        Make questions required by default
                      </h1>
                    </div>
                    <div className="">
                      <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={formSettings.defaults.makeAllQuestionsRequire}
                        onChange={handleMakeAllQuestionsRequireToggle}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
