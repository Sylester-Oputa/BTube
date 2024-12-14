import { AiFillHome } from "react-icons/ai";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdMovieEdit } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { TbHanger } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa";
import Logo from "../assets/BT.png";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY

interface CategoryType {
   id: string
   snippet: {
      title: string
   }
}

function Sidebar({ filter, setFilter, setCategoryId }: {
   filter: string
   setFilter: (filter: string) => void
   setCategoryId: (categoryId: string | null) => void
}) {
   
   const navigate = useNavigate()

   const [categoriesData, setCategoriesDate] = useState<CategoryType[]>([])

   const fetchAndSetCategories = async () => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=us`)
      setCategoriesDate(response.data.items)
   }

   useEffect(() => {
      fetchAndSetCategories()
   }, [])

   const mainLinks = [{
      icon: <AiFillHome className="text-3xl" />,
      name: "Home",
      filterTag: "home",
      categoryId: null
   }]
   
   const categoriesLinks = [
      {
         icon: <IoIosMusicalNotes className="text-3xl" />,
         name: "Music",
         filterTag: "music",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Music")?.id
      },
      {
         icon: <MdOutlineSportsBasketball className="text-3xl" />,
         name: "Sports",
         filterTag: "sports",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Sports")?.id
      },
      {
         icon: <IoGameControllerOutline className="text-3xl" />,
         name: "Games",
         filterTag: "games",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Gaming")?.id
      },
      {
         icon: <MdMovieEdit className="text-3xl" />,
         name: "Movies",
         filterTag: "movies",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Movies")?.id
      },
      {
         icon: <FaRegNewspaper className="text-3xl" />,
         name: "News",
         filterTag: "news",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "News & Politics")?.id
      },
      {
         icon: <TbHanger className="text-3xl" />,
         name: "Fashion",
         filterTag: "fashion",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Howto & Style")?.id
      },
      {
         icon: <FaRegLightbulb className="text-3xl" />,
         name: "Course",
         filterTag: "course",
         categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Education")?.id
      },
   ]



   const toggleFilter = (filterTag: string, categoryId: string | null) => {
      setFilter(filterTag)
      setCategoryId(categoryId)
   }

   const currentYear = new Date().getFullYear();


  return (
    <div data-bs-toggle="offcanvas" className="w-full h-full text-white bg-[#D46C6C]">
      <div className='flex items-center gap-8 w-[85%] mx-auto h-14'>
         <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <GiHamburgerMenu className="text-3xl color-[#DA8A85]"/>
         </a>
            <div className='flex items-center gap-1' onClick={() => navigate(`/`)}>
               <img src={Logo} alt='Logo' className="h-10 w-15" />
               <span className='text-xl'>BoomTube</span>
            </div>
         </div>
         <div>
            <ul className="border-b-[1px] border-zinc-700">
               {mainLinks.map(({ icon, name, filterTag, categoryId }) => 
                  <li
                  key={name}
                  className={`pl-6 py-3 hover:bg-[#DC352D] ${filter==filterTag ? "bg-[#DC352D]" : ""}`}
                  onClick={() => {toggleFilter(filterTag, categoryId); navigate(`/`)}}
                  >
                     <h1 className="flex items-center gap-5">
                        {icon}
                        <span className="text-sm">{name}</span>
                     </h1>
                  </li>
               )}
            </ul>
            <ul className="border-b-[1px] border-zinc-700">
               {categoriesLinks.map(({ icon, name, filterTag, categoryId }) => 
                  <li
                  key={name}
                  className={`pl-6 py-3 hover:bg-[#DC352D] ${filter==filterTag ? "bg-[#DC352D]" : ""}`}
                  onClick={() => toggleFilter(filterTag, categoryId)}
                  >
                     <h1 className="flex items-center gap-5">
                        {icon}
                        <span className="text-sm">{name}</span>
                     </h1>
                  </li>
               )}
            </ul>
         </div>

         <div className="text-center py-2 px-5 ">
            <p>Designed by Sylvester Oputa© {currentYear}</p>
         </div>

    </div>
  )
}

export default Sidebar
