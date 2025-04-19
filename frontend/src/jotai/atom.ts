import {atom} from 'jotai';
import axios from 'axios';
import { useResetAtom, atomWithReset } from 'jotai/utils';

export const authAtom = atomWithReset<boolean>(!!localStorage.getItem('token'));
export const isCategoryValidAtom = atomWithReset<boolean>(false);
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
export const platformAtom = atomWithReset<string>("");
export const categoryAtom = atomWithReset<string>("");

//Reset Atoms
export const useResetAllAtoms = () => {
    const resetAuth = useResetAtom(authAtom);
    const resetPlatform = useResetAtom(platformAtom);
    const resetCategory = useResetAtom(categoryAtom);

    return () => {
        resetAuth();
        resetPlatform();
        resetCategory();
    }
};
