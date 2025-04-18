import { useEffect, useState } from "react";
import axios from "axios";

export function useUserDetails(){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        categories: []
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            let categories = [];
            if(typeof res.data.categories === "string") categories = res.data.categories.split(" ");
            setUser({...res.data, categories});
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        })
    }, []);

    return {user, loading};
}