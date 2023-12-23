import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Third = ({ inputValue }: { inputValue: string }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!newPassword) {
      setNewPasswordErrorMessage("Password is required");
      setNewPasswordError(true);
      isValid = false;
    } else if (newPassword.length < 8 || newPassword.length > 20) {
      setNewPasswordErrorMessage(
        "Password must be at least 8 characters long and at most 20 characters long"
      );
      setNewPasswordError(true);
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        newPassword
      )
    ) {
      setNewPasswordErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      );
      setNewPasswordError(true);
      isValid = false;
    } else {
      setNewPasswordErrorMessage("");
      setNewPasswordError(false);
    }

    if (!confirmPassword.length) {
      setConfirmPasswordErrorMessage("Confirm password is required");
      setConfirmPasswordError(true);
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordErrorMessage("Passwords do not match");
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordErrorMessage("");
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = validateForm();

    if (formIsValid) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/forgotPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: inputValue,
              newPassword,
            }),
          }
        );
        const { success, message } = await res.json();
        if (success) {
          toast.success(message);
          router.push("/user/login");
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Validation error occurred");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="mx-auto flex w-full sm:max-w-md max-w-sm flex-col space-y-8 m-4">
      <div className="m-4 items-center justify-center">
        <div className="font-semibold text-3xl text-center mb-4">
          <p>Change Password</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 "
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newpassword"
                id="newpassword"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>
            {newPasswordError && (
              <p className="mt-2 text-sm text-red-500">
                {newPasswordErrorMessage}
              </p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm text-gray-600 ">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>
            {confirmPasswordError && (
              <p className="mt-2 text-sm text-red-500">
                {confirmPasswordErrorMessage}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Third;
