import { HomeVideoCardType } from "../utils/Types";
import { useState } from "react";
import { fetchVideosWithChannels } from "../utils/videoDetailsHelper";
import { getHomeVideos } from "../utils/api";

export const useHome =()=>{

   interface HomeHookPropsType {
      videos: HomeVideoCardType[],
      nextPageToken: string | null
   }

   const [homeVideos, setHomeVideos] = useState<Record<string,HomeHookPropsType>>(
      {
         home: { videos: [], nextPageToken: null },
         music: { videos: [], nextPageToken: null },
         sports: { videos: [], nextPageToken: null },
         games: { videos: [], nextPageToken: null },
         movies: { videos: [], nextPageToken: null },
         news: { videos: [], nextPageToken: null },
         fashion: { videos: [], nextPageToken: null },
         course: { videos: [], nextPageToken: null }
      })

      const [error, setError] = useState<string | null>(null)

   const fetchHomeVideos = async ( filter: string, categoryId: string | null, pageToken: string | null ) => {
      try {
        const response = await getHomeVideos(categoryId!, pageToken!)
        setError(null)
  
        const videos = await fetchVideosWithChannels(response.items)

      setHomeVideos(prev => ({
        ...prev,
        [filter]: {
          videos: [...prev[filter].videos, ...videos],
          nextPageToken: response.nextPageToken
        }
      }))
  
      } catch (error) {
        console.error(`Error fetching ${filter} videos:`, error)
        setError(`Error fetching the ${filter} videos, fetch again later.`)
      }
    }

      return { homeVideos, error, fetchHomeVideos }

}