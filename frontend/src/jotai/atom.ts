import {atom} from 'jotai';
import axios from 'axios';

export const authAtom = atom<boolean>(!!localStorage.getItem('token'));
export const isCategoryValidAtom = atom<boolean>(false);
export const isCategoryValidAtomInit = atom(null, async (_get, set) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await axios.get("http://localhost:3000/api/v1/user", {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        const categories = res.data.categories;
    
        await axios.post("http://localhost:3000/api/v1/validate-category", { categories });
        
        set(isCategoryValidAtom, true);
        return;
    } catch (error) {
        return;
    }
});


