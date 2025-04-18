import { useAtomValue } from "jotai";
import { authAtom, isCategoryValidAtom } from "../jotai/atom";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from "../components/ui/homeComponent";

function Home() {
  const auth = useAtomValue(authAtom);
  const isCategoryValid = useAtomValue(isCategoryValidAtom);
  const navigate = useNavigate();

  if(!auth){
    navigate('/signin');
  }
  if(!isCategoryValid){
    navigate('/categories')
  }
  return (
    <div className="h-screen w-full">
      <HomeComponent/>
    </div>
  )
}

export default Home