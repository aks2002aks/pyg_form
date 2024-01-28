import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  formId: string;
}

const ConfirmationModal: React.FC<Props> = ({
  setDeleteConfirmation,
  formId,
}) => {
  const { data: session } = useSession();

  const handleDeleteForm = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/deleteResponsesByFormId`,
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

      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/aws/s3/deleteFormFiles?formId=${formId}`
      );

      toast.success("Form deleted successfully");
      setDeleteConfirmation(false);
    } catch (error) {
      toast.error("Form deletion error : " + error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg border">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto bg-red-600">
              <i className="bx bx-error text-3xl">&#9888;</i>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">Warning!</p>
              <p className="text-sm text-gray-700 mt-1">
                All responses will be deleted and files associated with the responses will also be deleted. This
                action cannot be undone.
              </p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              onClick={handleDeleteForm}
            >
              Delete
            </button>
            <button
              id="confirm-cancel-btn"
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
              onClick={() => setDeleteConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
