import { useEffect, useState } from 'react'
import { CommentBodyType } from '../utils/Types'
import CommentBody from './CommentBody';
import { getCommentReplies } from '../utils/api';
import { parseReplies } from '../utils/parseData';


function CommentCard({ comment }: { comment: CommentBodyType }) {

   const [replies, setReplies] = useState<CommentBodyType[]>([])

   const fetchReplies = async() => {
      try {
         if (comment.commentRepliesCount) {
            const repliesResponse = await getCommentReplies(comment.commentId);

            const repliesData = parseReplies(repliesResponse)

            setReplies(repliesData)
         }
      } catch (error) {
         console.error(`Error fetching the comment replies`)
      }
   }

   useEffect(() => {
      fetchReplies()
    }, [])

  return (
    <div className='flex flex-col'>
      <CommentBody item={comment} />
      <div className="px-14">
         {replies?.map((item: any, ind) => 
               <CommentBody key={ind} item={item} />
         )}
      </div>
    </div>
  )
}

export default CommentCard
