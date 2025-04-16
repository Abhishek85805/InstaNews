import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NotExist from "./pages/NotExist";
import { LandingPage } from "./pages/LandingPage";
import { isCategoryValidAtomInit } from "./jotai/atom";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

function App() {
  const triggerInit = useSetAtom(isCategoryValidAtomInit);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    triggerInit()
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    })
  })

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="signin" element={<Signin/>}/>
          <Route path="categories" element={<Categories/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="*" element={<NotExist/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
