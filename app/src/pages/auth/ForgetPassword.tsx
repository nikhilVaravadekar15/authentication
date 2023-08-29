import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { z } from 'zod';
import { useFormik } from 'formik';
import { Link } from "react-router-dom"
import { TEmail } from "../../types";
import AuthLayout from "../../components/layout/AuthLayout"


function ForgetPassword() {

    const formSchema = z.object({
        email: z.string()
            .min(1, "Required")
            .email("Invalid email address")
    })

    const formik = useFormik<TEmail>({
        initialValues: {
            email: ""
        },
        validate: (values: TEmail) => {
            const errors: Partial<TEmail> = {};
            const result = formSchema.safeParse(values)

            if (!result.success) {
                const formErrors = result.error.format()

                if (formErrors.email) {
                    errors.email = formErrors.email?._errors[0]
                }

            }
            return errors
        },
        onSubmit: (values: TEmail) => {
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <AuthLayout>
            <Link
                to={"/"}
                className="w-fit font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
            >
                <BiLeftArrowAlt className="ml-2" size={16} />
                <span>Home</span>
            </Link>
            <h2 className="text-2xl font-bold leading-tight text-white">Forgot password</h2>
            <p className="mt-2 text-base text-gray-400">
                {"Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it."}
            </p>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                    <div className="h-24">
                        <div className="h-20">
                            <label htmlFor="" className="text-base font-medium text-gray-200">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {
                                    formik.errors.email && formik.touched.email && (
                                        <span className="text-xs text-red-500">{formik.errors.email}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="h-4">
                            <div className="my-2 flex gap-1 items-center justify-end">
                                <p className="text-sm font-medium text-gray-200">
                                    {"Didn't receive"}
                                </p>
                                <button type="button" className="text-sm font-semibold text-white hover:underline hover:text-blue-500">
                                    Send again
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-16 flex items-center">
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
                        >
                            Reset my password
                            <BiRightArrowAlt className="ml-2" size={16} />
                        </button>
                    </div>
                </div>
            </form>
            <div className="mt-3 space-y-3">
                <p className="text-gray-300 text-sm">
                    Read our
                    <span className="mx-1 capitalize cursor-pointer text-blue-300 hover:text-blue-400">
                        privacy policy
                    </span>
                    and
                    <span className="mx-1 capitalize cursor-pointer text-blue-300 hover:text-blue-400">
                        terms of service
                    </span>
                    to learn more
                </p>
            </div>
        </AuthLayout>
    )
}

export default ForgetPassword
