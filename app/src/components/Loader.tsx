import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
    size?: string
}

function Loader({ size }: Props) {

    return (
        <div className="Loader w-full h-full flex justify-center items-center">
            <div className='flex justify-center items-center'>
                <AiOutlineLoading3Quarters
                    className={
                        `animate-spin font-bold text-blue-600 ${size ? size : "w-10 h-10"}`
                    } />
            </div>
        </div>
    )
}

export default Loader
