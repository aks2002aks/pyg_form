import { handleFileValidationChange } from "@/redux/features/formField/formFieldSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  index: number;
}

const FileUpload: React.FC<Props> = ({ index }) => {
  const dispatch = useDispatch();
  const fileValidation = useSelector(
    (state: RootState) => state.formField.formFields[index].fileValidation
  );
  const [allowedFileTypes, setAllowedFileTypes] = useState<string[]>(
    fileValidation?.allowedFileTypes ?? []
  );
  const [maxFileSize, setMaxFileSize] = useState<number>(
    fileValidation?.maxFileSize ?? 1
  );
  const [showOptions, setShowOptions] = useState<boolean>(
    fileValidation?.allowedFileTypes.length > 0 ? true : false
  );

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const fileTypeExtensions: Record<string, string[]> = {
    presentation: [
      ".ppt",
      ".pptx",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    spreadsheet: [
      ".xls",
      ".xlsx",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    "application/pdf": [
      ".pdf",
      "application/pdf",
      "application/x-pdf",
      "application/acrobat",
      "applications/vnd.pdf",
      "text/pdf",
      "text/x-pdf",
      "application/vnd.adobe.acrobat.pdf",
      "application/x-bzpdf",
      "application/x-gzpdf",
    ],
    "image/*": ["image/png", "image/jpg", "image/jpeg", "image/gif"],
    "video/*": ["video/mp4", "video/avi", "video/mov"],
    "audio/*": ["audio/mp3", "audio/wav"],
    document: [
      ".doc",
      ".docx",
      ".zip", // Add .zip for ZIP files
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip-compressed",
    ],
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileType = e.target.value;

    // Check for specific file types
    if (
      fileType === "presentation" ||
      fileType === "spreadsheet" ||
      fileType === "application/pdf" ||
      fileType === "image/*" ||
      fileType === "video/*" ||
      fileType === "audio/*" ||
      fileType === "document"
    ) {
      const extensions = fileTypeExtensions[fileType];

      if (e.target.checked) {
        setAllowedFileTypes([...allowedFileTypes, ...extensions]);
      } else {
        setAllowedFileTypes(
          allowedFileTypes.filter((type) => !extensions.includes(type))
        );
      }
    }
  };

  const handleMaxFileSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxFileSize(parseInt(e.target.value));
  };


  useEffect(() => {
    const handleSubmit = () => {
      const newValidation: any = {
        allowedFileTypes,
        maxNumFiles: 1,
        maxFileSize,
      };
      dispatch(handleFileValidationChange({ index, newValidation }));
    };
    handleSubmit();
  }, [allowedFileTypes, dispatch, index, maxFileSize]);

  return (
    <div className="flex flex-col md:w-1/2 space-y-6">
      <div className="flex justify-between">
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="flexSwitchCheckDefault"
        >
          Allow Only Specific File Types
        </label>
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={showOptions}
          onClick={handleToggleOptions}
        />
      </div>
      {showOptions && (
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="presentation"
              id="presentation"
              checked={
                allowedFileTypes.includes(".ppt") ||
                allowedFileTypes.includes(".pptx") ||
                allowedFileTypes.includes("application/vnd.ms-powerpoint") ||
                allowedFileTypes.includes(
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                )
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="presentation">
              Presentation
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="spreadsheet"
              id="spreadsheet"
              checked={
                allowedFileTypes.includes(".xls") ||
                allowedFileTypes.includes(".xlsx") ||
                allowedFileTypes.includes("application/vnd.ms-excel") ||
                allowedFileTypes.includes(
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                )
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="spreadsheet">
              Spreadsheet
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="application/pdf"
              id="pdf"
              checked={
                allowedFileTypes.includes(".pdf") ||
                allowedFileTypes.includes("application/pdf") ||
                allowedFileTypes.includes("application/x-pdf") ||
                allowedFileTypes.includes("application/acrobat") ||
                allowedFileTypes.includes("applications/vnd.pdf") ||
                allowedFileTypes.includes("text/pdf") ||
                allowedFileTypes.includes("text/x-pdf") ||
                allowedFileTypes.includes(
                  "application/vnd.adobe.acrobat.pdf"
                ) ||
                allowedFileTypes.includes("application/x-bzpdf") ||
                allowedFileTypes.includes("application/x-gzpdf")
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="pdf">
              PDF
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="image/*"
              id="image"
              checked={
                allowedFileTypes.includes("image/png") ||
                allowedFileTypes.includes("image/jpg") ||
                allowedFileTypes.includes("image/jpeg") ||
                allowedFileTypes.includes("image/gif")
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="image">
              Image
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="video/*"
              id="video"
              checked={
                allowedFileTypes.includes("video/mp4") ||
                allowedFileTypes.includes("video/avi") ||
                allowedFileTypes.includes("video/mov")
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="video">
              Video
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="audio/*"
              id="audio"
              checked={
                allowedFileTypes.includes("audio/mp3") ||
                allowedFileTypes.includes("audio/wav")
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="audio">
              Audio
            </label>
          </div>
          <div className="form-check flex items-center">
            <input
              className="form-check-input w-5 h-5  mr-2"
              type="checkbox"
              value="document"
              id="document"
              checked={
                allowedFileTypes.includes(".doc") ||
                allowedFileTypes.includes(".docx") ||
                allowedFileTypes.includes(".zip") ||
                allowedFileTypes.includes("application/msword") ||
                allowedFileTypes.includes(
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ) ||
                allowedFileTypes.includes("application/zip") ||
                allowedFileTypes.includes("application/x-zip-compressed")
              }
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="document">
              Document
            </label>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3>Max File Size (MB):</h3>
        <select
          value={maxFileSize}
          onChange={handleMaxFileSizeChange}
          className="p-2 active:bg-gray-200 focus:bg-gray-200 rounded-md"
        >
          <option value={1}>1 MB</option>
          <option value={5}>5 MB</option>
          <option value={10}>10 MB</option>
          <option value={100}>100 MB</option>
        </select>
      </div>
      <div className="text-sm text-red-700 font-medium">
        NOTE* : max upload limit for this form is 1GB
      </div>
    </div>
  );
};

export default FileUpload;
