import { useEffect } from 'react';
import Card from '../Components/Card';
import { useHome } from '../Hooks/useHome';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Components/Loading';

function Home({ filter, categoryId }: { filter: string, categoryId: string | null }) {

  const { homeVideos, error, fetchHomeVideos } = useHome()
  
  useEffect(() => {
    fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken)
  }, [categoryId]);

  useEffect(() => {
    // console.log(homeVideos)
  }, [homeVideos])


  return (
    <div>
      { error ? (
        <div className='mt-8 text-xl font-semibold text-center text-red-500'>{error}</div>
      ) :
        <InfiniteScroll
        next={() => fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken)}
        hasMore={true}
        dataLength={ homeVideos[filter].videos.length }
        loader={<Loading />}
        >
          <div className='row row-cols-md-3 row-cols-sm-2 row-cols-1 w-[95%] mx-auto mt-6'>
            {homeVideos[filter].videos?.map(item => 
              <Card key={item.videoId} data={item} />
            )}
          </div>
        </InfiniteScroll>
      }
    </div>
    
  )
}

export default Home
