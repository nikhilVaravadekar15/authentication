import {
    BiLeftArrowAlt,
    BiRightArrowAlt
} from "react-icons/bi"
import { Link } from "react-router-dom"
import AuthLayout from '../../components/layout/AuthLayout'


function Signup() {
    return (
        <AuthLayout>
            <Link
                to={"/"}
                className="font-semibold flex gap-3 items-center text-white transition-all duration-200 hover:text-blue-500"
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
            <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="text-base font-medium text-gray-200">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="text-base font-medium text-gray-200">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-base font-medium text-gray-200">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                placeholder="Password"
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
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
