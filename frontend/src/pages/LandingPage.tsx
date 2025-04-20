import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Button } from "../components/ui/button";
import { authAtom, isCategoryValidAtom } from "../jotai/atom";
import { useAtomValue } from "jotai";


export function LandingPage() {
  const navigate = useNavigate();
  const auth = useAtomValue(authAtom);
  const isCategoryValid = useAtomValue(isCategoryValidAtom);

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Instant Smart News
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Stay ahead with real-time news updates from all your favorite platforms in one place. With instaNews, you can explore trending stories, breaking headlines, and in-depth coverage across multiple categories — from tech and politics to entertainment and sports. Customize your feed, follow what matters most to you, and never miss a moment. Fast, reliable, and tailored just for you.
        </p>
      </div>
      <Button text="Get Started" onClick={() =>{
        if(auth && isCategoryValid){
          navigate('/home');
          console.log("Home")
        }
        else if(auth && !isCategoryValid) navigate('/categories');
        else navigate('/signin');
      }}/>
      <BackgroundBeams />
    </div>
  );
}
