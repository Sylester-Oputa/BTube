import { FaList } from "react-icons/fa";
import { ChannelPlaylistType } from '../utils/Types';
import { Link } from 'react-router-dom';


function ChannelPlaylistCard({ item, channelId }: { item: ChannelPlaylistType, channelId: string }) {
  return (
   <Link to={`/playlist/${channelId}/${item.id}`}>
      <div className='flex flex-col col hover:scale-[102%] duration-200 ease-in-out'>
         {/* thumbnail */}
         <div className="relative ">
            <div className="absolute flex gap-2 items-center bg-[#0c0c0cd0] px-2 py-0.5 rounded bottom-2 right-2">
               <FaList />
               <h3>{item.videoCount} videos</h3>
            </div>
            <img src={item.thumbnail} className="object-cover aspect-[16/9] w-[300px] rounded" alt="" />
            </div>
         {/* title */}
         <div className="flex flex-col gap-1 mt-1">
            <h1 className='text-sm sm:text-md line-clamp-1'>{item.title}</h1>
         </div>
      </div>   
   </Link>
   
  )
}

export default ChannelPlaylistCard
