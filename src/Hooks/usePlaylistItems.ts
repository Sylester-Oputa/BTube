import { useState } from "react"
import { PlaylistVideoType } from "../utils/Types"
import { getPlaylistVideos } from "../utils/api"


interface PlaylistItemsState {
   videos: PlaylistVideoType[],
   nextPageToken: string | null
}


export const usePlaylistItems = () => {
   const [ playlistItems, setPlaylistItems ] = useState<PlaylistItemsState>({ videos: [], nextPageToken: null })

   const fetchPlaylistVideos = async(playlistId: string) => {
      const playlistVideosResponse = await getPlaylistVideos(playlistId!)

      const playlistVideosData = playlistVideosResponse.items.map((item: any) => ({
         id: item.snippet.resourceId.videoId,
         title: item.snippet.title,
         thumbnail: item.snippet.thumbnails.high!.url! || item.snippet.thumbnails.standard!.url!,
      }))

      setPlaylistItems(prev => ({
         videos: [...prev.videos,...playlistVideosData],
         nextPageToken: playlistVideosResponse.nextPageToken 
      }))
   }

   return { fetchPlaylistVideos, playlistItems }
}