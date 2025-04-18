import axios from "axios";
import { useEffect, useState } from "react";
import { platformAtom, categoryAtom } from "../jotai/atom";
import { useAtomValue } from "jotai";

export function useNews(){
    const selectedPlatform = useAtomValue(platformAtom);
    const selectedCategory = useAtomValue(categoryAtom);
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);
    useEffect(() => {
        if(selectedCategory === "" || selectedPlatform === "") return;
        setLoadingNews(true);
        axios.get(`http://localhost:3000/api/v1/${selectedCategory}/${selectedPlatform}`)
        .then((res) => {
            setNews(res.data);
            setLoadingNews(false);
        })
        .catch(() => {
            setLoadingNews(false);
        })
    }, [selectedCategory, selectedPlatform]);
    return {news, loadingNews};
}