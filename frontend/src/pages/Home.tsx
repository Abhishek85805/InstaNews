import { useAtomValue } from "jotai";
import { authAtom, isCategoryValidAtom } from "../jotai/atom";
import { useNavigate } from "react-router-dom";

function Home() {
  const auth = useAtomValue(authAtom);
  const isCategoryValid = useAtomValue(isCategoryValidAtom);
  const navigate = useNavigate();

  if(!auth){
    navigate('/signin');
  }
  console.log(isCategoryValid);
  if(!isCategoryValid){
    navigate('/categories')
  }
  return (
    <div>
      Home
    </div>
  )
}

export default Home