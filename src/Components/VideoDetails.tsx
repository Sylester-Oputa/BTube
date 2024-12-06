import { useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { AiOutlineShareAlt } from "react-icons/ai";
import { HomeVideoCardType } from '../utils/Types';



function VideoDetails({details}: { details?: HomeVideoCardType }) {
   
   const [showDescription, setShowDescription] = useState(false)
   
  return (
    <div className='flex flex-col gap-2 mx-1 mt-2'>
      {/* VideoTitle */}
      <h1 className='text-lg font-semibold sm:text-xl md:text-2xl'>{details?.videoTitle}</h1>
      <div className="justify-between md:flex">
         {/* channel Info */}
         <div className="flex gap-3">
            <Link to={`/channel/${details?.channelInfo.id}`}>
               <img src={details?.channelInfo.image} alt="" className="w-12 aspect-[1/1] rounded-full object-fit hover:scale-[108%] duration-200 ease-in-out" />
            </Link>
            <div className="flex flex-col text-md sm:text-lg">
               <h2 className='font-semibold'>{details?.channelInfo.name}</h2>
               <h2>{details?.channelInfo.subCount} subscribers</h2>
            </div>
         </div>
         {/* Buttons */}
         <div className="flex gap-3 mt-1 cursor-pointer text-md sm:text-lg sm:mt-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#DC352D]">
               <AiOutlineLike />
               <span className='h-6 border'></span>
               <span>{details?.videoLikes}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#DC352D]">
               <AiOutlineShareAlt />
               <span>share</span>
            </div>
         </div>
      </div>
      {/* Description */}
      <div className="px-3 py-2 sm:text-lg text-md bg-neutral-700 rounded-xl">
         <p className={`whitespace-pre-line ${showDescription ? "" : "line-clamp-3"}`}>{details?.videoDescription}</p>
         {!showDescription ? 
            <button className='' onClick={() => setShowDescription(true)}>...more</button>
            :
            <button className='' onClick={() => setShowDescription(false)}>...less</button>
         }
      </div>
    </div>
  )
}

export default VideoDetails
