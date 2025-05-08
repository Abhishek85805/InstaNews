import { Link } from "react-router-dom"


export function NewsComponent({obj}: any){
    return (
        <div className="border-b-[1px] border-b-neutral-800 px-[1.4rem] py-[2rem]">
            <div className="mb-[0.5rem] font-semibold text-neutral-600">{obj.source.name}</div>
            <div className="font-bold text-3xl mb-[0.5rem]">{obj.title}</div>
            <div className="font-semibold mb-[0.3rem]">{obj.content}</div>
            <div className="mb-[2rem]">
                <Link to={obj.url}>Read more</Link>
            </div>
            <div>
                <img src={obj.urlToImage} alt="" className="rounded-md w-full"/>
            </div>

        </div>

    )
}