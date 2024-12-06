import { getChannelInfo } from "./api"
import { parseVideos } from "./parseData"
import { HomeVideoCardType } from "./Types"


export const fetchVideosWithChannels = async (items: any[]) => {

   const videoData = parseVideos(items)

    const channelIds = videoData.map((video: HomeVideoCardType) => video.channelInfo.id).join(',')

    const channelResponse = await getChannelInfo(channelIds!)
   
    const channelData: { [key: string]: { image: string, subCount: string }  } = {}
   
   channelResponse.forEach((channel: any) => {
      channelData[channel.id] = {
         image: channel.snippet.thumbnails.default.url,
         subCount: channel.statistics.subscriberCount
      }
   })

   const videos = videoData.map((video: HomeVideoCardType) => ({
      ...video,
      channelInfo: {
        ...video.channelInfo,
        image: channelData[video.channelInfo.id].image,
        subCount: channelData[video.channelInfo.id].subCount
      }
   }))

   return videos;
}


