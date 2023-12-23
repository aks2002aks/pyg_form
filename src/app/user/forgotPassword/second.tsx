import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

interface SecondProps {
  inputValue: string;
  handleNext: () => void;
  handleBack: () => void;
}

const Second: React.FC<SecondProps> = ({
  inputValue,
  handleBack,
  handleNext,
}) => {
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [otp, setOtp] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(300);
  const [ResendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (ResendTimer === 0) {
      setCanResend(true);
    }
  }, [setCanResend, ResendTimer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleBack();
    }
  }, [handleBack, timer]);

  useEffect(() => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
      setIsEmail(true);
    } else if (/^\+91\d{10}$/.test(inputValue)) {
      setIsPhone(true);
    }
  }, [setIsEmail, setIsPhone, inputValue]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const otpArray = pastedData.match(/\d/g);
    if (otpArray && otpArray.length === 4) {
      setOtp(otpArray);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index]) {
      e.preventDefault();
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const enteredOtp = otp.join("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verifyOTPUsingEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue,
          otp: enteredOtp,
        }),
      }
    );
    const { success, message } = await res.json();

    if (success) {
      setIsError(false);
      handleNext();
      toast.success(message);
    } else {
      setIsError(true);
    }
  };

  const handleResendOtp = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resendEmailOTP`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValue,
        }),
      }
    );
    const { success, message } = await res.json();

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto flex w-full sm:max-w-md max-w-sm flex-col space-y-8 m-4">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex flex-row  font-semibold text-3xl">
          <div
            className="rounded-full cursor-pointer bg-gray-200 p-2 mr-4"
            onClick={handleBack}
          >
            <FiArrowLeft size={24} />
          </div>
          <p>
            {isEmail
              ? "Email Verification"
              : isPhone
              ? "Phone Verification"
              : ""}
          </p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>
            We have sent a code to your{" "}
            {isEmail ? "email" : isPhone ? "phone number" : ""}{" "}
            <span className="font-bold text-black">
              {isEmail ? inputValue : isPhone ? `${inputValue}` : ""}
            </span>
          </p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>Enter the Otp</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>
            Valid For: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
            {timer % 60}
          </p>
        </div>
      </div>

      <div>
        <form onSubmit={handleOtpVerification}>
          <div className="flex flex-col space-y-12 mx-3">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 sm:w-16 sm:h-16 ">
                  <input
                    className="w-full h-full flex flex-col items-center justify-center text-center md:px-5  px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name=""
                    id=""
                    pattern="\d*"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onPaste={handleOtpPaste}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    ref={(ref) => (inputRefs.current[i] = ref)}
                  />
                </div>
              ))}
            </div>

            <div className="text-red-500 text-sm font-medium h-[10px] text-center">
              {isError && (
                <p>The OTP entered is incorrect. Please try again.</p>
              )}
            </div>

            <div className="flex flex-col space-y-5 m-3">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full  border rounded-xl outline-none py-3 bg-red-500 hover:bg-red-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn&apos;t recieve code?</p>{" "}
                {canResend ? (
                  <p
                    className="flex flex-row items-center text-blue-600 cursor-pointer"
                    onClick={handleResendOtp}
                  >
                    Resend
                  </p>
                ) : (
                  <p>Resend in {ResendTimer} seconds</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Second;
