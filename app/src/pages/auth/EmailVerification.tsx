import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { Link } from "react-router-dom"
import AuthLayout from "../../components/layout/AuthLayout"

function EmailVerification() {
    return (
        <AuthLayout>
            <Link
                to={"/"}
                className="font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
            >
                <BiLeftArrowAlt className="ml-2" size={16} />
                <span>Home</span>
            </Link>
            <h2 className="text-2xl font-bold leading-tight text-white">Email Verification</h2>
            <div className="mt-2 text-base text-gray-300">
                We have sent an email verification link to
                <span className="mx-1 font-medium text-blue-400 cursor-pointer">elon_musk@gmail.com</span>.
                If you don't see it, check your spam folder.
                If you didn't receive the email, click the below button
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
                >
                    Re-send Email
                    <BiRightArrowAlt className="ml-2" size={16} />
                </button>
            </div>
        </AuthLayout>
    )
}

export default EmailVerification
