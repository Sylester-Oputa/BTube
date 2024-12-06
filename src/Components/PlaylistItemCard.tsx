import { Link } from 'react-router-dom';
import { PlaylistVideoType } from '../utils/Types';

function PlaylistItemCard({ item, ind, channelId }: { item: PlaylistVideoType, ind: number, channelId: string }) {
  return (
   <Link to={`/watch/${item.id}/${channelId}`}>
      <div className='flex flex-col col hover:scale-[102%] duration-200 ease-in-out'>
      {/* thumbnail */}
      <div className="relative ">
         <div className="absolute flex gap-2 items-center bg-[#0c0c0cd0] px-2 py-0.5 top-0 left-0 h-full sm:w-[100px] w-[60px]">
            <h3 className='w-full text-xl text-center text-neutral-400'>{ind + 1}</h3>
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

export default PlaylistItemCard
