import { useUserDetails } from "../../hooks/useUserDetails"
import { Sidebar } from "./sidebar";
import { useNews } from "../../hooks/useNews";
import { Mainbar } from "./mainbar";
import { Rightbar } from "./right-bar";

export function HomeComponent(){
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

    const {news, loadingNews} = useNews()

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex h-full bg-black text-gray-200">
            <Sidebar user={user}/>
            <Mainbar news={news} loadingNews={loadingNews}/>
            <Rightbar user={user}/>
        </div>
    )
}
