/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { useParams } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout"

function ResetPassword() {
    // @ts-ignore
    const { token }: { token: string } = useParams();


    console.log(typeof (token))

    return (
        <AuthLayout>
            <a
                href="/"
                className="font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
            >
                <BiLeftArrowAlt className="ml-2" size={16} />
                <span>Home</span>
            </a>
            <h2 className="text-2xl font-bold leading-tight text-white">Reset password</h2>
            <p className="mt-2 text-sm text-gray-400">
                Enter your new password below.
            </p>
            <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="" className="text-base font-medium text-gray-200">
                            New password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                placeholder="********"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-base font-medium text-gray-200">
                            Confirm new password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                placeholder="********"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
                        >
                            Reset password
                            <BiRightArrowAlt className="ml-2" size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}

export default ResetPassword
