import {
    BsPatchCheck
} from "react-icons/bs"
import {
    BiRightArrowAlt
} from "react-icons/bi"
import AuthLayout from "../../components/layout/AuthLayout"


function PasswordResetMail() {
    return (
        <AuthLayout>
            <div className="font-semibold flex gap-3 items-center text-white transition-all duration-200">
                <BsPatchCheck size="2rem" className="text-green-400 hover:text-green-600" />
                <h1 className="text-2xl font-bold leading-tight">Successfully sent</h1>
            </div>
            <div className="mt-2 text-base text-gray-300">
                We have sent an instruction on how to reset your password to
                <span className="mx-1 font-medium text-blue-400 cursor-pointer">elon_musk@gmail.com</span>.
                Please follow the instructions in the email.
            </div>
            <div className="mt-2">
                <div className="my-2 text-sm text-gray-300">
                    If you don't see it, check your spam folder.
                    If you didn't receive the email, click the below button.
                </div>
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


export default PasswordResetMail
