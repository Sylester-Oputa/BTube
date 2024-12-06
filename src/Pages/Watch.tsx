import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoDetails from '../Components/VideoDetails';
import MiniCard from '../Components/MiniCard';
import { HomeVideoCardType } from '../utils/Types';
import { fetchVideosWithChannels } from '../utils/videoDetailsHelper';
import Comments from '../Components/Comments';
import { getActivities, getActivitiesVideos, getVideoDetails } from '../utils/api';


function Watch() {
   const { videoId, channelId } = useParams()
   const [ activities, setActivities ] = useState<HomeVideoCardType[]>()

   const [details, setDetails] = useState<HomeVideoCardType>()

   const fetchDetails = async () => {
      try {
         const response = await getVideoDetails(videoId!)

         const videoDetails =  await fetchVideosWithChannels(response)

         setDetails(videoDetails[0])
      } catch (error) {
         
      }
   }

   const fetchActivities = async () => {
      try {
         const response = await getActivities(channelId!)

         const videoIds: string[] = []

         response.items.forEach(
            (item:{
               contentDetails:{
                  upload?: { videoId: string },
                  playListItem?: { resourceId: { videoId: string } }
               }
            }) => {
               if(item.contentDetails.upload){
                  videoIds.push(item.contentDetails.upload.videoId)
               }
               // else if(item.contentDetails.playListItem){
               //    videoIds.push(item.contentDetails.playListItem.resourceId.videoId)
               // }
            }
         )
         const vidResponse = await getActivitiesVideos(videoIds!)

         const videosArray = await fetchVideosWithChannels(vidResponse.items)
         setActivities(videosArray)

      } catch (error) {
         
      }
   }

   useEffect(() => {
      
   }, [details])

   useEffect(() => {
      fetchDetails()
      fetchActivities()
   }, [videoId, channelId])
   
  return (
   <div className="w-[95%] mx-auto mt-6 mb-12">
      <div className="row">
         <div className="col-xl-8 cols-lg-7">
            <iframe 
            className="w-full aspect-[16/9]"
            src={`https://www.youtube.com/embed/${details?.videoId}?autoplay=1`}
            title='YouTube video player'
            allow='autoplay; picture-inpicture;'
            allowFullScreen
            >
            </iframe>
            <VideoDetails details={details} />
            <div className="hidden lg:block">
               <Comments videoId={details?.videoId}/>
            </div>
         </div>
         <div className="flex flex-col gap-3 mt-3 col-xl-4 col-lg-5 lg:mt-0">{
            activities?.map((item) => (
               <MiniCard key={item.videoId} item={item} />
            )
            )
            }</div>
            <div className="block lg:hidden">
               <Comments videoId={details?.videoId}/>
            </div>
      </div>
   </div>
  )
}

export default Watch
