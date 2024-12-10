export const formatViews = (views: number) => {
   if (views >= 1_000_000) {
     return `${(views / 1_000_000).toFixed(1)}M`; // Convert to millions
   } else if (views >= 1_000) {
     return `${(views / 1_000).toFixed(1)}k`; // Convert to thousands
   } else {
     return views.toString(); // Less than 1,000 views, return as-is
   }
 }; 