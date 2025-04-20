import { useAtom } from "jotai"
import { categoryAtom } from "../../jotai/atom"
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useResetAllAtoms } from "../../jotai/atom";
import { IconBallFootball, IconHospitalCircle, IconBusinessplan, IconMovie, IconFlask, IconCpu, IconAlertHexagon } from '@tabler/icons-react'

const catToIcon: { [key: string]: ReactElement } = {
    "general": <IconCpu stroke={2} />,
    "crime": <IconAlertHexagon stroke={2} />,
    "technology": <IconCpu stroke={2} />,
    "sports": <IconBallFootball stroke={2} />,
    "health": <IconHospitalCircle stroke={2} />,
    "science": <IconFlask stroke={2} />,
    "business": <IconBusinessplan stroke={2} />,
    "entertainment": <IconMovie stroke={2} />
}

export function Sidebar({user}: {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        categories: string[]
    }
}){
    const resetAppState = useResetAllAtoms();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
    return (
        <div className="w-[18rem] h-full bg-black flex flex-col items-start border-r-neutral-800 border-r-[1px] pt-[1.5rem] px-[1.8rem]">
            <div className="text-2xl flex gap-2 mb-[0.8rem]">
                <h1 className="font-bold">IN</h1>
                <h1 className="font-bold">Insta News</h1>
            </div>
            <div className="mb-[1.4rem]">
                {user.categories.map((cat, idx) => 
                    <div 
                        className={`cursor-pointer text-2xl font-semibold hover:bg-neutral-900 py-[0.4rem] px-[0.7rem] rounded-md transition-all duration-200 ease-in ${selectedCategory === cat ? ' text-gray-200' : 'text-gray-400'}`} 
                        onClick={() => {setSelectedCategory(cat)}} key={idx}
                        >
                            <div className="flex justify-start items-center gap-[0.8rem]">
                                <div>{catToIcon[cat]}</div>
                                <div>{cat[0].toUpperCase() + cat.slice(1)}</div>
                            </div>
                    </div>
                )}
            </div>
            <button
            className="bg-gray-200 text-black w-full py-[0.5rem] rounded-md font-semibold text-[18px] cursor-pointer hover:bg-gray-400"
            onClick={() => {
                resetAppState();
                localStorage.removeItem('token')
                navigate('/signin')
            }}
            >Logout</button>
        </div>
    )
}