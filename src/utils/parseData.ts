import { ChannelPlaylistType, CommentBodyType, HomeVideoCardType, PlaylistInfoType } from './Types';
import { formatLikes, formatViews } from '../Hooks/FormatVideoData';

export const parseVideos = ((items: any[]): HomeVideoCardType[] => {
   return items.map((video: any): HomeVideoCardType => {
      const durationIso = video.contentDetails.duration;
      const durationMatch = durationIso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = parseInt(durationMatch?.[1] || "0", 10);
      const minutes = parseInt(durationMatch?.[2] || "0", 10) + hours * 60;
      const seconds = parseInt(durationMatch?.[3] || "0", 10);
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      const publishedAtIso = video.snippet.publishedAt;
      const formattedPublishedDate = publishedAtIso.slice(0, 10);

      const formattedViews = formatViews(Number(video.statistics.viewCount));

      const formattedLikes = formatLikes(Number(video.statistics.likeCount));

      return {
         videoId: video.id,
         videoThumbnail: video.snippet.thumbnails.high.url,
         videoTitle: video.snippet.title,
         videoDuration: formattedDuration,
         videoAge: formattedPublishedDate,
         videoDescription: video.snippet.description,
         videoLikes: formattedLikes,
         channelInfo: {
            id: video.snippet.channelId,
            name: video.snippet.channelTitle,
            image: video.snippet.thumbnails.default.url,
         },
         videoViews: formattedViews,
      };
   });
  });


export const parseChannelPlaylists = ((items: any[]): ChannelPlaylistType[] => {
   return items.map((item: any): ChannelPlaylistType => {
      return {
         id: item.id,
         title: item.snippet.title,
         thumbnail: item.snippet.thumbnails.high!.url! || item.snippet.thumbnails.standard!.url!,
         videoCount: item.contentDetails.itemCount
      }
   })
})

export const parseComments = (items: any[]): CommentBodyType[] =>{
   return items.map((comment: any): CommentBodyType => ({
      commentId: comment.id,
      authorChannelId: comment.snippet.topLevelComment.snippet.authorChannelId.value,
      authorProfile: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
      authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
      commentText: comment.snippet.topLevelComment.snippet.textOriginal,
      commentLikes: comment.snippet.topLevelComment.snippet.likeCount,
      commentRepliesCount: comment.snippet.totalReplyCount
   }))
}

export const parseReplies = (items: any[]): CommentBodyType[] => {
   return items.map((item: any): CommentBodyType => ({
      commentId: item.id,
      authorChannelId: item.snippet.authorChannelId.value,
      authorProfile: item.snippet.authorProfileImageUrl,
      authorName: item.snippet.authorDisplayName,
      commentText: item.snippet.textOriginal,
      commentLikes: item.snippet.likeCount
   }))
}

export const parsePlaylistInfo = (item: any): PlaylistInfoType => ({
   id: item.id,
   title: item.snippet.title,
   description: item.snippet.description,
   thumbnail: item.snippet.thumbnails.standard!.url! || item.snippet.thumbnails.high!.url!
})