// import React from 'react'
import { Link } from 'react-router-dom';
import { HomeVideoCardType } from '../utils/Types';

function ChannelVideoCard({ item }: { item: HomeVideoCardType }) {
  return (
    <Link to={`/watch/${item.videoId}/${item.channelInfo.id}`}>
    <div className='flex flex-col col hover:scale-[102%] duration-200 ease-in-out'>
      {/* thumbnail */}
      <div className="relative ">
         <div className="absolute sm:text-sm text-[14px] bg-[#0c0c0cd0] px-2 py-0.5 rounded sm:bottom-2 bottom-1 sm:right-2 right-1">{item.videoDuration}</div>
         <img src={item.videoThumbnail} className="object-cover aspect-[16/9] w-[300px] rounded" alt="" />
      </div>
      {/* title */}
      <div className="flex flex-col gap-1 mt-1">
         <h1 className='text-md line-clamp-1'>{item.videoTitle}</h1>
         <div className="gap-3 text-sm text-gray-400 sm:flex">
            <h2>{item.videoViews} views</h2>
            <h2>{item.videoAge}</h2>
         </div>
      </div>
    </div>
    </Link>
  )
}

export default ChannelVideoCard
