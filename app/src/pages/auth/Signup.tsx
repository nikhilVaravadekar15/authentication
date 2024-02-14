/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { signupSchema } from "../../zod";
import Loader from "../../components/Loader";
import { sendOtp, userSignUp } from "../../http";
import { TEmail, TUsersignup } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { OtpVerificationContext } from "../../components/provider/OtpVerificationContextProvider";

function Signup() {
  const navigate = useNavigate();
  const { sethashDetails, setEmailDetails } = React.useContext(
    OtpVerificationContext
  );

  const sendOtpMutation = useMutation({
    mutationFn: async ({ email }: TEmail) => {
      return await sendOtp({
        email: email,
      });
    },
    onSuccess: (data: any) => {
      const hash: string = data?.data?.hash;
      const email: string = data?.data?.user?.email;
      sethashDetails(hash);
      setEmailDetails(email);
      return navigate("/auth/otp-verification");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ username, email, password }: TUsersignup) => {
      return await userSignUp({
        username: username,
        email: email,
        password: password,
      });
    },
    onSuccess: (data: any) => {
      sendOtpMutation.mutate({
        email: data?.data?.user?.email,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const formik = useFormik<TUsersignup>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values: TUsersignup) => {
      const errors: Partial<TUsersignup> = {};
      const result = signupSchema.safeParse(values);

      if (!result.success) {
        const formErrors = result.error.format();

        if (formErrors.username) {
          errors.username = formErrors.username?._errors[0];
        }
        if (formErrors.email) {
          errors.email = formErrors.email?._errors[0];
        }
        if (formErrors.password) {
          errors.password = formErrors.password?._errors[0];
        }
      }
      return errors;
    },
    onSubmit: (values: TUsersignup) => {
      signUpMutation.mutate(values);
    },
  });

  return signUpMutation.isPending || sendOtpMutation.isPending ? (
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
        Sign up to create account
      </h2>
      <p className="mt-2 text-base text-gray-400">
        {"Already have an account? "}
        <a
          href="/auth/sign-in"
          className="font-medium text-white transition-all duration-200 hover:underline hover:text-blue-500"
        >
          Sign In
        </a>
      </p>
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <div className="h-24">
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-200"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                name="username"
                type="text"
                autoComplete={"off"}
                value={formik.values.username}
                onChange={formik.handleChange}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {formik.errors.username && formik.touched.username && (
                <span className="text-xs text-red-500">
                  {formik.errors.username}
                </span>
              )}
            </div>
          </div>
          <div className="h-24">
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                autoComplete={"off"}
                value={formik.values.email}
                onChange={formik.handleChange}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="h-24">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-200"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                autoComplete={"off"}
                value={formik.values.password}
                onChange={formik.handleChange}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-xs text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>
          <div className="h-16 flex items-center">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
            >
              Get started
              <BiRightArrowAlt className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Signup;
