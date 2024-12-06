import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { usePlaylistInfo } from '../Hooks/usePlaylist'
import { usePlaylistItems } from '../Hooks/usePlaylistItems'
import PlaylistItems from '../Components/PlaylistItems'



function Playlist() {
   const { channelId, playlistId } = useParams()
   const { playlistInfo, showDesc, setShowDesc, fetchPlaylistInfo } = usePlaylistInfo()
   const { fetchPlaylistVideos, playlistItems } = usePlaylistItems()
   

   

   useEffect(() => {
      fetchPlaylistInfo(playlistId!)
      fetchPlaylistVideos(playlistId!)
   }, [])
   
  return (
   <div className="">
         {/* modal */}
      { showDesc && playlistInfo?.description &&
         <div className="z-[10] absolute overflow-hidden transform -translate-x-1/2 left-1/2 top-14 bg-neutral-800 rounded-xl">
            <div className="flex flex-col gap-2 items-end w-[600px] p-8 max-h-[500px] overflow-y-auto">
               <div className="">
                  <AiOutlineClose
                  className="text-2xl text-neutral-200"
                  onClick={() => setShowDesc(false)} />
               </div>
               <p className="text-lg whitespace-pre-line">{playlistInfo?.description}</p>
            </div>
         </div>
      }
      
      <div className="w-[90%] mx-auto md:mt-8 mt-4">
      <div className="p-3 md:p-5 row row-cols-2 bg-neutral-900 rounded-xl">
         {/* image */}
         <div className="col-md-4 col-12">
            <img src={playlistInfo?.thumbnail} className="aspect-[16/10]  object-cover mx-auto" alt="" />
         </div>
         {/* details */}
         <div className="flex flex-col gap-2 col-12 md:col-8">
            <h1 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>{playlistInfo?.title}</h1>
            {playlistInfo?.description &&
               <div className="">
                  <p className="whitespace-pre-line line-clamp-3 text-neutral-400">{playlistInfo?.description}</p>
                  <button 
                  onClick={() => setShowDesc(true)} 
                  className="font-semibold">
                     more...
                  </button>
               </div>
            }
         </div>
      </div>
         <PlaylistItems videos={playlistItems.videos} channelId={channelId!} />
   </div>
   </div>
  )
}

export default Playlist
