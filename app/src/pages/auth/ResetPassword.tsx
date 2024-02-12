/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TPassword } from "../../types";
import { passwordSchema } from "../../zod";
import { resetPassword } from "../../http";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Loader from "../../components/Loader";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // # ISSUE
  const token: string = searchParams.get("q")!;

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: TPassword) => {
      return await resetPassword({
        token: token,
        data: data,
      });
    },
    onSuccess: () => {
      return navigate("/auth/password-reset-done");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const formik = useFormik<TPassword>({
    initialValues: {
      password: "",
    },
    validate: (values: TPassword) => {
      const errors: Partial<TPassword> = {};
      const result = passwordSchema.safeParse(values);

      if (!result.success) {
        const formErrors = result.error.format();

        if (formErrors.password) {
          errors.password = formErrors.password?._errors[0];
        }
      }
      return errors;
    },
    onSubmit: (values: TPassword) => {
      resetPasswordMutation.mutate(values);
    },
  });

  return resetPasswordMutation.isPending ? (
    <>
      <Loader />
    </>
  ) : (
    <AuthLayout>
      <a
        href="/"
        className="w-fit font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
      >
        <BiLeftArrowAlt className="ml-2" size={16} />
        <span>Home</span>
      </a>
      <h2 className="text-2xl font-bold leading-tight text-white">
        Reset password
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        Enter your new password below.
      </p>
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="h-24">
            <label htmlFor="" className="text-base font-medium text-gray-200">
              New password
            </label>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                placeholder="********"
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
              Reset password
              <BiRightArrowAlt className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
