export function Sidebar({user, setSelectedCategory}: {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        categories: string[]
    },
    setSelectedCategory: any
}){
    return (
        <div className="group w-[5rem] hover:w-[18rem] h-full bg-neutral-800 transition-all duration-600 ease-in-out flex flex-col items-center">
            <div className="flex gap-4">
                <h1 className="font-bold">IN</h1>
                <h1 className="font-bold hidden group-hover:block transition-all delay-1000 duration-1000 opacity-0 group-hover:opacity-100">Insta News</h1>
            </div>
            {user.categories.map((cat, idx) => <div className="cursor-pointer" onClick={() => {setSelectedCategory(cat)}} key={idx}>{cat}</div>)}
        </div>
    )
}