import { useAtom } from "jotai"
import { categoryAtom } from "../../jotai/atom"

export function Sidebar({user}: {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        categories: string[]
    }
}){
    const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
    return (
        <div className="w-[18rem] h-full bg-black flex flex-col items-start border-r-neutral-800 border-r-[1px] pt-[1.5rem] px-[1.8rem]">
            <div className="text-2xl flex gap-2 mb-[0.8rem]">
                <h1 className="font-bold">IN</h1>
                <h1 className="font-bold">Insta News</h1>
            </div>
            {user.categories.map((cat, idx) => 
                <div 
                    className={`cursor-pointer text-2xl font-semibold hover:bg-neutral-900 py-[0.3rem] px-[0.5rem] rounded-md transition-all duration-200 ease-in ${selectedCategory === cat ? ' text-gray-400' : 'text-gray-200'}`} 
                    onClick={() => {setSelectedCategory(cat)}} key={idx}
                    >
                        {cat[0].toUpperCase() + cat.slice(1)}
                </div>
            )}
        </div>
    )
}