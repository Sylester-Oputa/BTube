import { PlaylistVideoType } from '../utils/Types';
import PlaylistItemCard from './PlaylistItemCard';

function PlaylistItems({ videos, channelId }: { videos: PlaylistVideoType[], channelId: string }) {
  return (
      <div className="mt-4 gap-y-4 row row-cols-md-4 row-cols-sm-3 row-cols-2">
      {
         videos.map((item: PlaylistVideoType, ind) =>
            <PlaylistItemCard key={item.id} item={item} ind={ind} channelId={channelId} />
      )}
   </div>
  )
}

export default PlaylistItems
