import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { Link } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"


function Signin() {

    return (
        <AuthLayout>
            <Link
                to={"/"}
                className="font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
            >
                <BiLeftArrowAlt className="ml-2" size={16} />
                <span>Home</span>
            </Link>
            <h2 className="text-2xl font-bold leading-tight text-white">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-400">
                {"Don't have an account? "}
                <Link
                    to={"/auth/sign-up"}
                    className="font-semibold text-white transition-all duration-200 hover:underline hover:text-blue-500"
                >
                    Create a free account
                </Link>
            </p>
            <form className="mt-8">
                <div className="space-y-5">
                    <div className="h-24">
                        <span className="text-base font-medium text-gray-200">
                            Email address
                        </span>
                        <div className="my-2">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete={"off"}
                                // value={formik.values.email}
                                // onChange={formik.handleChange}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {/* {
                                formik.errors.email && formik.touched.email && (
                                    <span className="text-xs text-red-500">{formik.errors.email}</span>
                                )
                            } */}
                        </div>
                    </div>
                    <div className="h-24">
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-gray-200">
                                Password
                            </span>
                            <Link to={"/auth/forget-password"} className="text-sm font-semibold text-white hover:underline hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="my-2">
                            <input
                                name="password"
                                type="password"
                                placeholder="********"
                                // value={formik.values.password}
                                // onChange={formik.handleChange}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {/* {
                                formik.errors.password && formik.touched.password && (
                                    <span className="text-xs text-red-500">{formik.errors.password}</span>
                                )
                            } */}
                        </div>
                    </div>
                    <div>
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

export default Signin
