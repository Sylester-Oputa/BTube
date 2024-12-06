// import axios from "axios";
import { useState } from "react";
import { ChannelInfoType, ChannelPlaylistType, HomeVideoCardType } from "../utils/Types";
import { getActivities, getActivitiesVideos, getChannelInfo, getChannelPlaylists } from "../utils/api";
import { fetchVideosWithChannels } from "../utils/videoDetailsHelper";
import { parseChannelPlaylists } from "../utils/parseData";
// import ChannelVideoList from '../Components/ChannelVideoList';

interface ChannelVideoListState{
   videos: HomeVideoCardType[],
   nextPageToken: string | null
}

interface ChannelPlayListState{
   playlists: ChannelPlaylistType[],
   nextPageToken: string | null
}

export const useChannel = () => {
   const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null)
   const [channelVideoList, setChannelVideoList] = useState<ChannelVideoListState>({ videos: [], nextPageToken: null })
   const [channelPlayLists, setChannelPlayLists] = useState<ChannelPlayListState>({ playlists: [], nextPageToken: null })
   const [category, setCategory] = useState("videos")
   const [hasMore, setHasMore] = useState(true)

   const fetchChannelInfo = async(channelId: string) => {
      const channelInfoResponse = await getChannelInfo(channelId)

      const channelInfoData = {
         id: channelInfoResponse[0].id,
         thumbnail: channelInfoResponse[0].snippet.thumbnails.high.url,
         title: channelInfoResponse[0].snippet.title,
         customUrl: channelInfoResponse[0].snippet.customUrl,
         description: channelInfoResponse[0].snippet.description,
         subCount: channelInfoResponse[0].statistics.subscriberCount,
         videoCount: channelInfoResponse[0].statistics.videoCount,
      }

      setChannelInfo(channelInfoData)
   }

   const fetchChanneldata = async(channelId: string, pageToken?: string) => {
      if (category == "videos" ){

         const channelVideosResponse = await getActivities(channelId, channelVideoList!.nextPageToken!)

         const videoIds: string[] = []

         channelVideosResponse.items.forEach(
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
         setChannelVideoList(prev =>({
            videos: [...prev.videos, ...videosArray],
            nextPageToken: channelVideosResponse.nextPageToken
         }))
         setHasMore(videoIds.length <= Number(channelInfo?.videoCount))

      } else {
         const channelPlaylistsResponse = await getChannelPlaylists(channelId!, channelPlayLists!.nextPageToken!)
      
         const channelPlaylistsData = parseChannelPlaylists(channelPlaylistsResponse.items)
         setChannelPlayLists(prev => ({
            playlists: [...prev.playlists, ...channelPlaylistsData],
            nextPageToken: channelPlaylistsResponse.nextPageToken
         }))
         setHasMore(Boolean(channelPlaylistsResponse.nextPageToken))
      }
      
   }

   return { channelPlayLists, category, setCategory, channelInfo, fetchChannelInfo, channelVideoList, fetchChanneldata, hasMore }
}