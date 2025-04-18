import { NewsComponent } from "./news-component";
import { platformAtom } from "../../jotai/atom";
import { useAtom } from "jotai";

const platforms = ["news", "reddit", "twitter"]

export function Mainbar({news, loadingNews}: {news: any, loadingNews: boolean}){
    const [selectedPlatform, setSelectedPlatform] = useAtom(platformAtom);
    if(loadingNews){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="flex-1 bg-black border border-black overflow-y-scroll">
            <div className="flex border-b-[1px] border-b-neutral-800 text-2xl font-semibold justify-between">
                {platforms.map(platform => <div key={platform} className={`p-[0.3rem] hover:bg-neutral-900 cursor-pointer w-full flex justify-center py-[1rem] ${selectedPlatform === platform ? 'text-gray-400' : 'text-gray-200'}`} onClick={() => setSelectedPlatform(platform)}>{platform[0].toUpperCase()+platform.slice(1)}</div>)}
            </div>
            {
                news.map((obj: any, idx: number) => (
                    <NewsComponent obj = {obj} key={idx}/>
                ))
            }
        </div>
    )
}