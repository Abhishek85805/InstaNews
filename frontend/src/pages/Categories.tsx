import { useEffect, useState } from "react";
import { CategoryButton } from "../components/category-button"
import { Button } from "../components/ui/button"
import { useCategory } from "../hooks/useCategory"
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authAtom, isCategoryValidAtom } from "../jotai/atom";
import { useAtomValue, useSetAtom } from "jotai";

const categoryList = [
  "general",
  "crime",
  "sports",
  "world",
  "entertainment",
  "business",
  "health",
  "science",
  "technology"
];

function Categories() {
  const auth = useAtomValue(authAtom);
  const setIsCategoryValid = useSetAtom(isCategoryValidAtom);
  const navigate = useNavigate();
  const {categories, loading}: {categories: string[], loading: boolean} = useCategory();
  const [buttons, setButtons] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if(!loading){
      const initialState: Record<string, boolean> = {};
      categoryList.forEach(cat => {
        initialState[cat] = categories.includes(cat);
      })
      setButtons(initialState);
    }
  }, [categories])

  const toggleCategory = (category: string) => {
    setButtons((prev) => { 
      return {
        ...prev,
        [category]: !prev[category]
      }
    })
  }

  async function onClick(){
    const selectedCategories = categoryList.filter(cat => buttons[cat]);
    const categoryString = selectedCategories.join(" ");

    try {
      const response = await axios.patch('http://localhost:3000/api/v1/', {categories: categoryString}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success(response.data.msg);
      setIsCategoryValid(true);
      navigate("/home")
    } catch (error:any) {
      toast.error(error.response.data.error || "Something went wrong");
    }
  }

  if(!auth){
    navigate('/signin')
  }
  if(loading){
    return <div>
      Loading...
    </div>
  }

  return (
    <div className='bg-black h-screen text-white flex flex-col justify-center items-center'>
      <h1 className="text-3xl font-bold mb-[3rem]">Pick your favorite news categories</h1>
      <div className="w-[40rem] flex gap-5 flex-wrap justify-center mb-[3rem]">
        {
          categoryList.map(cat => (
            <CategoryButton 
              key={cat}
              text={cat.charAt(0).toUpperCase() + cat.slice(1)}
              selected={buttons[cat]}
              onClick={() => toggleCategory(cat)}
            />
          ))
        }
      </div>
      <Button text="Continue" onClick = {onClick}/>
    </div>
  )
}

export default Categories