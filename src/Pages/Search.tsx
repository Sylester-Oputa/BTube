import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getActivitiesVideos, getSearchVideos } from '../utils/api'
import { fetchVideosWithChannels } from '../utils/videoDetailsHelper'
import { HomeVideoCardType } from '../utils/Types'
import Card from '../Components/Card'

function Search({ setSearch }: { setSearch: (q: string) => void }) {
   const [searchParams] = useSearchParams()
   const searchQuery = searchParams.get('query')
   const [searchList, setSearchList] = useState<HomeVideoCardType[] | null>()

   const fetchSearchVideos = async () => {
      const searchVideosData = await getSearchVideos(searchQuery!)

      const videoIds: string[] = []

      searchVideosData.items.forEach((item: { id: { videoId?: string } }) => {
         if(item.id.videoId) {
            videoIds.push(item.id.videoId)
         }
      });

      const VideosData = await getActivitiesVideos(videoIds)

      const videosArray = await fetchVideosWithChannels(VideosData.items)

      setSearchList(videosArray)
   }

   useEffect(() => {
      if(searchQuery) {
         setSearchList(null)
         fetchSearchVideos()
      }

       return () => {
         setSearchList(null)
         setSearch("")
       }
    }, [searchQuery])



  return (
    <div className='row row-cols-md-3 row-cols-sm-2 row-cols-1 w-[95%] mx-auto mt-6'>
      {
         searchList?.map((item: HomeVideoCardType) =>
            <Card data={item} />
         )
      }
    </div>
  )
}

export default Search
