import axios from "axios";
import { useEffect, useState } from "react";

export function useNews({selectedCategory, platform}: {selectedCategory: string, platform: string}){
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);
    useEffect(() => {
        if(selectedCategory === "") return;
        setLoadingNews(true);
        axios.get('http://localhost:3000/api/v1/general/news')
        .then((res) => {
            setNews(res.data);
            setLoadingNews(false);
        })
        .catch(() => {
            setLoadingNews(false);
        })
    }, [selectedCategory]);
    return {news, loadingNews};
}