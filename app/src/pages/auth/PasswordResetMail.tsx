import React from "react";
import { BsPatchCheck } from "react-icons/bs";
import AuthLayout from "../../components/layout/AuthLayout";
import { ForgotPasswordContext } from "../../components/provider/ForgotPasswordContextProvider";
import { Navigate } from "react-router-dom";

function PasswordResetMail() {
  const { email } = React.useContext(ForgotPasswordContext);

  return email.email ? (
    <AuthLayout>
      <div className="font-semibold flex gap-3 items-center text-white transition-all duration-200">
        <BsPatchCheck
          size="2rem"
          className="text-green-400 hover:text-green-600"
        />
        <h1 className="text-2xl font-bold leading-tight">Successfully sent</h1>
      </div>
      <div>
        <div className="mt-2 text-base text-gray-300">
          We have sent an instruction on how to reset your password to
          <span className="mx-1 font-medium text-blue-400 cursor-pointer">
            {email.email}
          </span>
          . Please follow the instructions in the email.
        </div>
        <div className="my-2 text-sm text-gray-300">
          Note: If you don't see it, check your spam folder.
        </div>
      </div>
    </AuthLayout>
  ) : (
    <>
      <Navigate to="/auth/forget-password" replace={true} />
    </>
  );
}

export default PasswordResetMail;
