import axios from "axios";
import { useEffect, useState } from "react";

export function useCategory(){
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const categoryString = res.data.categories;
            if(categoryString !== null){
                const categoryArray = categoryString.split(' ');
                setCategories(categoryArray);
            }
            setLoading(false);
        })
    }, [])

    return {categories, loading}
}