import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { Link } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"

function ForgetPassword() {
    return (
        <AuthLayout>
            <Link
                to={"/"}
                className="font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
            >
                <BiLeftArrowAlt className="ml-2" size={16} />
                <span>Home</span>
            </Link>
            <h2 className="text-2xl font-bold leading-tight text-white">Forgot password</h2>
            <p className="mt-2 text-base text-gray-400">
                {"Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it."}
            </p>
            <form action="#" method="POST" className="mt-4">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="" className="text-base font-medium text-gray-200">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div className="my-2 flex gap-1 items-center justify-end">
                            <p className="text-sm font-medium text-gray-200">
                                {"Didn't receive"}
                            </p>
                            <button type="button" className="text-sm font-semibold text-white hover:underline hover:text-blue-500">
                                Send again
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
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
