import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Logo from "../assets/BT.png";
import { useNavigate } from "react-router-dom";


function Navbar( {search, setSearch}: { search: string, setSearch: (q: string) => void }) {
   
   const navigate = useNavigate()


   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key == "Enter"){
         e.preventDefault()
         if (search.trim()) {
            navigate(`/search?query=${search}`)
         } else {
            navigate(`/`)
         }
      }
   }
   
  return (
    <div className='sticky top-0 z-50 w-full bg-[#D46C6C]'>
      <div className='flex md:gap-4 gap-5 justify-between h-14 w-[95%] mx-auto'>
         <div className='flex items-center gap-3 cursor-pointer md:gap-8'>
         <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <GiHamburgerMenu className="text-lg sm:text-3xl"/>
         </a>
            <div 
            className='flex items-center gap-1' 
            onClick={() => navigate(`/`)}>
               <img src={Logo} alt='Logo' className="w-8 h-8 sm:h-5 sm:w-10" />
               <span className='text-sm sm:text-md'>BTube</span>
            </div>
         </div>
         <div className='flex items-center'>
            <form>
               <div className='flex item-center sm:h-10 h-9 border-[0.6px] border-neutral-700 rounded-full overflow-hidden'>
                  <div className='flex items-center pr-3 sm:pr-5'>
                     <input
                        value={search}
                        type='text'
                        placeholder='Search'
                        className='w-50 sm:w-80 px-2 text-sm sm:text-md text-zinc-300 placeholder-neutral-200 bg-[#D46C6C] focus:outline-none'
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                     />
                     <IoMdClose 
                        onClick={() => setSearch('')} 
                        className={`sm:text-lg text-md cursor-pointer text-neutral-200 ${!search ? `invisible` : "visible"}`}/>
                  </div>
                  
                  <button
                  
                  className='w-16 flex items-center justify-center border-l-[1px] border-neutral-700'>
                     <MdOutlineSearch className='text-xl sm:text-2xl text-neutral-200' />
                  </button>
               </div>
            </form>
         </div>
         <div className='hidden md:block'>
            {/* Empty */}
         </div>
      </div>
    </div>
  )
}

export default Navbar
