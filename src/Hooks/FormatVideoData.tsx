export const formatViews = (views: number) => {
   if (views >= 1_000_000) {
     return `${(views / 1_000_000).toFixed(1)}M`;
   } else if (views >= 1_000) {
     return `${(views / 1_000).toFixed(1)}k`;
   } else {
     return views.toString();
   }
 }; 


 export const formatLikes = (likes: number) => {
   if (likes >= 1_000_000) {
     return `${(likes / 1_000_000).toFixed(1)}M`;
   } else if (likes >= 1_000) {
     return `${(likes / 1_000).toFixed(1)}k`;
   } else {
     return likes.toString();
   }
 };