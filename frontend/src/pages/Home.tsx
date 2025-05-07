import { useAtomValue, useSetAtom } from "jotai";
import { authAtom, isCategoryValidAtom } from "../jotai/atom";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from "../components/ui/homeComponent";
import { useEffect } from "react";
import { firstCategoryAtom, categoryAtom } from "../jotai/atom";

function Home() {
  const firstCategory = useAtomValue(firstCategoryAtom);
  const setCategory = useSetAtom(categoryAtom);
  const auth = useAtomValue(authAtom);
  const isCategoryValid = useAtomValue(isCategoryValidAtom);
  const navigate = useNavigate();

  if(!auth){
    navigate('/signin');
  }
  if(!isCategoryValid){
    navigate('/categories')
  }

  useEffect(() => {
    setCategory(firstCategory);
  }, []);
  return (
    <div className="h-screen w-full">
      <HomeComponent/>
    </div>
  )
}

export default Home