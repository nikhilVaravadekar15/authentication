
function Error() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-base font-semibold text-white">404</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Page not found
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-200">
                {"Sorry, we couldn't find the page you're looking for."}
            </p>
        </div>
    )
}

export default Error
