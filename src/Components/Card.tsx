import { HomeVideoCardType } from "../utils/Types"
import { Link } from "react-router-dom";

function Card({ data }: { data: HomeVideoCardType }) {
  return (
    <div className='flex flex-col gap-3 pb-3 hover:scale-[101%] duration-200 easy-in-out'>
        {/* Thumbnail */}
        <div className="relative">
            <Link to={`/watch/${data.videoId}/${data.channelInfo.id}`}>
                <img src={data.videoThumbnail} className="aspect-[16/9] object-cover w-full rounded-xl bg-neutral-900" alt="" />
            </Link>
            <span className='absolute bottom-2 sm:bottom-3 sm:right-3 right-2 text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded'>{data.videoDuration}</span>
        </div>
        {/* details */}
        <div className="flex gap-2 ">
            <Link to={`/channel/${data.channelInfo.id}`}
            className="aspect-[1/1] md:h-10 h-8">
                <img src={data.channelInfo.image} className="object-cover rounded-full hover:scale-[108%] duration-200 easy-in-out" alt="" />
            </Link>
            <div className="flex flex-col">
                <h3 className='sm:text-lg text-md line-clamp-2'>{data.videoTitle}</h3>
                <div className="text-sm sm:text-md">
                    <h4>{data.channelInfo.name}</h4>
                    <div className="flex gap-1">
                        <span>{data.videoViews} views</span>
                        <span> . </span>
                        <span>{data.videoAge}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
