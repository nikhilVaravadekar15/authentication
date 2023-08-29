import {
    BsPatchCheck
} from "react-icons/bs"
import {
    BiRightArrowAlt
} from "react-icons/bi"
import AuthLayout from "../../components/layout/AuthLayout"
import { Link } from "react-router-dom"

function SignupVerified() {
    return (
        <AuthLayout>
            <div className="font-semibold flex gap-3 items-center text-white transition-all duration-200">
                <BsPatchCheck size="2rem" className="text-green-400 hover:text-green-600" />
                <h1 className="text-2xl font-bold leading-tight">Email Verified</h1>
            </div>
            <div className="mt-2 text-base text-gray-300">
                Hurray! Your email has been verified. You can now login.
            </div>
            <div className="mt-4">
                <Link
                    to={"/auth/sign-in"}
                    className="flex w-full items-center justify-center rounded-md bg-gray-300 px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-100"
                >
                    Sign In
                    <BiRightArrowAlt className="ml-2 font-black" size={16} />
                </Link>
            </div>
        </AuthLayout>
    )
}

export default SignupVerified
