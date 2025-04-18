export function Mainbar({news, loadingNews}: {news: any, loadingNews: boolean}){
    console.log(news);

    if(loadingNews){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="flex-1 bg-black border rounded-l-3xl border-black">
            {
                news.map((obj: any) => (
                    <div>
                        <h1>{obj.title}</h1>
                    </div>
                ))
            }
        </div>
    )
}