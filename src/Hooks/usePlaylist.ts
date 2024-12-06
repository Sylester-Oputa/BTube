import { useState } from "react"
import { PlaylistInfoType } from "../utils/Types"
import { getPlaylistInfo } from "../utils/api"
import { parsePlaylistInfo } from "../utils/parseData"

export const usePlaylistInfo = () => {
   const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfoType | null>()
   const [ showDesc, setShowDesc ] = useState(false)

   const fetchPlaylistInfo = async(playlistId: string) => {
      const playlistInfoResponse = await getPlaylistInfo(playlistId)
      
      const playlistInfoData = parsePlaylistInfo(playlistInfoResponse)

      setPlaylistInfo(playlistInfoData)
   }

   return { playlistInfo, showDesc, setShowDesc, fetchPlaylistInfo }
}