import React from 'react'
import ChannelPlaylistCard from './ChannelPlaylistCard'
import { ChannelPlaylistType } from '../utils/Types';

function ChannelPlaylist({ channelId, channelPlayLists }: { channelId: string, channelPlayLists: ChannelPlaylistType[] }) {
  return (
   <div className='row row-cols-lg-4 row-cols-md-3 row-cols-2 gap-y-4'>
      {
         channelPlayLists.map((item: ChannelPlaylistType) =>
            <ChannelPlaylistCard key={item.id} item={item} channelId={channelId} />
         )
      }
   </div>
  )
}

export default ChannelPlaylist
