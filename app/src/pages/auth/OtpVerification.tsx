/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React from "react";
import OTPInput from "react-otp-input";
import { verifyOtp } from "../../http";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../components/layout/AuthLayout";
import { OtpVerificationContext } from "../../components/provider/OtpVerificationContextProvider";

function OtpVerification() {
  const navigate = useNavigate();
  const [inputOtp, setInputOtp] = React.useState<string>("");
  const { hash, email } = React.useContext(OtpVerificationContext);

  const verifyOtpMutation = useMutation({
    mutationFn: async (inputOtp: string) => {
      return await verifyOtp({
        hash: hash,
        email: email,
        otp: parseInt(inputOtp),
      });
    },
    onSuccess: () => {
      return navigate("/auth/sign-up-verified");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  async function submitOtp() {
    if (inputOtp === "") {
      setInputOtp("");
      toast.error("Please enter the valid OTP.");
    } else {
      verifyOtpMutation.mutate(inputOtp);
    }
  }

  return verifyOtpMutation.isPending ? (
    <>
      <Loader />
    </>
  ) : (
    <AuthLayout>
      <Link
        to={"/"}
        className="w-fit font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
      >
        <BiLeftArrowAlt className="ml-2" size={16} />
        <span>Home</span>
      </Link>
      <h2 className="text-2xl font-bold leading-tight text-white">
        OTP Verification
      </h2>
      <div className="h-28 flex flex-col justify-center items-center">
        <OTPInput
          value={inputOtp}
          numInputs={6}
          onChange={setInputOtp}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          renderSeparator={<span className="mx-1"></span>}
          containerStyle="h-12 flex justify-center items-center"
          inputStyle={{
            width: "48px",
            height: "100%",
            backgroundColor: "#323232",
            textAlign: "center",
            borderRadius: "8px",
            borderWidth: "4px",
            borderColor: "rgb(100 116 139)",
          }}
        />
      </div>
      {email && hash && (
        <div className="mt-2 text-sm text-gray-300">
          We have sent an email verification link to
          <span className="mx-1 font-medium text-blue-400 cursor-pointer">
            {email}
          </span>
          . If you don't see it, check your spam folder.
        </div>
      )}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => submitOtp()}
          className="inline-flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
        >
          Verify
          <BiRightArrowAlt className="ml-2" size={16} />
        </button>
      </div>
    </AuthLayout>
  );
}

export default OtpVerification;
