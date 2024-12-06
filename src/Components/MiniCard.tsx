import { Link } from 'react-router-dom';
import { HomeVideoCardType } from '../utils/Types';

function MiniCard( { item }: { item:HomeVideoCardType } ) {
  return (
   <Link to={`/watch/${item.videoId}/${item.channelInfo.id}`}>
    <div className='flex gap-3 hover:scale-[101%] duration-200 ease-in-out'>
      <div className="relative min-w-fit">
         <span className='sm:text-md text-sm absolute bottom-1 rignt-1 bg-[#0c0c0cd0] px-2 py-0.5 rounded'>{item.videoDuration}</span>
         <img src={item.videoThumbnail} className="w-40 aspect-[16/9] object-cover rounded" alt="" />
      </div>
      <div className="">
         <h1 className='text-md'>{item.videoTitle}</h1>
         <div className="text-sm text-gray-500">
            <h2>{item.channelInfo.name}</h2>
            <div className="flex items-center gap-1">
               <h2>{item.videoViews}</h2>
               <span className='w-[4px] h-[4px] bg-gray-500'></span>
               <h2>{item.videoAge}</h2>
            </div>
         </div>
      </div>
    </div>
    </Link>
  )
}

export default MiniCard
