import { useEffect, useState } from "react";
import { useUserDetails } from "../../hooks/useUserDetails"
import { Sidebar } from "./sidebar";
import { useNews } from "../../hooks/useNews";
import { Mainbar } from "./mainbar";
export function HomeComponent(){
    const [selectedCategory, setSelectedCategory] = useState("");
    const {user, loading}: {
        user: {
            firstName: string,
            lastName: string,
            email: string,
            password: string,
            categories: string[]
        },
        loading: boolean
    } = useUserDetails();

    // useEffect(() => {
    //     console.log(selectedCategory)
    // }, [selectedCategory]);
    const {news, loadingNews} = useNews({ selectedCategory, platform: "web" })

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex h-full bg-neutral-800 text-gray-200">
            <Sidebar user={user} setSelectedCategory={setSelectedCategory}/>
            <Mainbar news={news} loadingNews={loadingNews}/>
        </div>
    )
}
