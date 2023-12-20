import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { signupSchema } from "../../zod"
import { TUsersignup } from "../../types"
import AuthLayout from '../../components/layout/AuthLayout'


function Signup() {

    const formik = useFormik<TUsersignup>({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
        },
        validate: (values: TUsersignup) => {
            const errors: Partial<TUsersignup> = {};
            const result = signupSchema.safeParse(values)

            if (!result.success) {
                const formErrors = result.error.format()

                if (formErrors.fullname) {
                    errors.fullname = formErrors.fullname?._errors[0]
                }
                if (formErrors.email) {
                    errors.email = formErrors.email?._errors[0]
                }
                if (formErrors.password) {
                    errors.password = formErrors.password?._errors[0]
                }

            }
            return errors
        },
        onSubmit: (values: TUsersignup) => {
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
            <h2 className="text-2xl font-bold leading-tight text-white">Sign up to create account</h2>
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
                        <label htmlFor="name" className="text-base font-medium text-gray-200">
                            Fullname
                        </label>
                        <div className="mt-2">
                            <input
                                name="fullname"
                                type="text"
                                autoComplete={"off"}
                                placeholder="fullname"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {
                                formik.errors.fullname && formik.touched.fullname && (
                                    <span className="text-xs text-red-500">{formik.errors.fullname}</span>
                                )
                            }
                        </div>
                    </div>
                    <div className="h-24">
                        <label htmlFor="email" className="text-base font-medium text-gray-200">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete={"off"}
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
                    <div className="h-24">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-base font-medium text-gray-200">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                autoComplete={"off"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {
                                formik.errors.password && formik.touched.password && (
                                    <span className="text-xs text-red-500">{formik.errors.password}</span>
                                )
                            }
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
    )
}

export default Signup
