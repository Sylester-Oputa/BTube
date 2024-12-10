import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChannel } from '../Hooks/useChannel';
import { AiOutlineClose } from "react-icons/ai";
import ChannelVideoList from '../Components/ChannelVideoList';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Components/Loading';
import ChannelPlaylist from "../Components/ChannelPlaylist";




function Channel() {

   const { channelId } = useParams()

   const { channelPlayLists, category, setCategory, channelInfo, fetchChannelInfo, channelVideoList, fetchChanneldata, hasMore } = useChannel()
   const [showDesc, setShowDesc] = useState(false)


   const fetchMoreChanneldata = () => {
      fetchChanneldata(channelId!, channelVideoList!.nextPageToken!)
   }

   

   useEffect (() => {
      fetchChannelInfo(channelId!)
      fetchChanneldata(channelId!)
   }, [category])

  return (
    <div className="relative mb-12">
      {/* modal */}
      { showDesc && channelInfo?.description &&
         <div className="z-[10] absolute overflow-hidden bg-neutral-800 rounded-xl left-1/2 top-14 transform -translate-x-1/2">
            <div className="flex flex-col gap-2 items-end w-[600px] max-h-[500px] p-8 overflow-y-auto">
               <div className="">
                  <AiOutlineClose
                  className="text-2xl cursor-pointer hover:scale-[130%] duration-200 ease-in-out text-neutral-200"
                  onClick={() => setShowDesc(false)} />
               </div>
               <p className="text-lg whitespace-pre-line">{channelInfo?.description}</p>
            </div>
         </div>
      }

      
      <InfiniteScroll
        next={() => fetchMoreChanneldata()}
        hasMore={hasMore}
        dataLength={ channelVideoList.videos.length }
        loader={<Loading />}
        >
         <div className="w-[95%] mx-auto md:mt-8 mt-6">
         <div className="row row-cols-2">
            {/* image */}
            <div className="col-4">
               <img src={channelInfo?.thumbnail} className="md:w-52 sm:w-40 w-36 aspect-[1/1] rounded-full object-cover mx-auto" alt="" />
            </div>
            {/* details */}
            <div className="col-8">
               <h1 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>{channelInfo?.title}</h1>
               <div className="gap-4 mt-2 sm:text-lg text-md sm:flex text-neutral-400">
                  <h2>{channelInfo?.customUrl}</h2>
                  <h2>{channelInfo?.subCount} Subscribers</h2>
                  <h2>{channelInfo?.videoCount} Videos</h2>
               </div>
               {channelInfo?.description &&
                  <div className="">
                     <p className="w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line">{channelInfo?.description}</p>
                     <button 
                     onClick={() => setShowDesc(true)} 
                     className="font-semibold">
                        more...
                     </button>
                  </div>
               }
            </div>
         </div>

         <div className="my-1 sm:my-3">
            <button 
               onClick={() => setCategory("videos")} 
               className={`md:w-44 w-32 sm:text-xl text-lg py-2 font-semibold ${category == "videos" ? "border-b" : ""}`}>
               Videos
            </button>
            <button 
               onClick={() => setCategory("playlists")} 
               className={`md:w-44 w-32 sm:text-xl text-lg font-semibold ${category == "playlists" ? "border-b" : ""}`}>
               Playlists
            </button>
            <hr className="h-1" />
         </div>
         {category == "videos"
           ? <ChannelVideoList channelVideos={channelVideoList!.videos} />
           : <ChannelPlaylist channelId={channelInfo!.id} channelPlayLists={channelPlayLists!.playlists} />
         }
         </div>
         </InfiniteScroll>
    </div>
  )
}

export default Channel
