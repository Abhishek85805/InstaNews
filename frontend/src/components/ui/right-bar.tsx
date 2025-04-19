import { useNavigate } from "react-router-dom"

export function Rightbar({user}: {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        categories: string[]
    }
}){
    const navigate = useNavigate();
    return (
        <div className="w-[18rem] h-full bg-black flex flex-col items-start border-l-neutral-800 border-l-[1px] pt-[1.5rem] px-[1.8rem]">
            <div className="flex items-center gap-[0.8rem] mb-[1.3rem]">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                    <span className="font-medium text-black ">{user.firstName[0].toUpperCase()+user.lastName[0].toUpperCase()}</span>
                </div>
                <div>{user.firstName} {user.lastName}</div>
            </div>
            <button
            className="bg-[#1d9bf0] text-white w-full py-[0.5rem] rounded-md font-semibold text-[18px] cursor-pointer"
            onClick={() => {
                navigate('/categories')
            }}
            >
                Update Categories
            </button>
        </div>
    )
}