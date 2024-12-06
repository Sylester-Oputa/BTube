import { useEffect, useState } from 'react'
import { CommentBodyType } from '../utils/Types';
import CommentCard from './CommentCard';
import { getVideoComments } from '../utils/api';
import { parseComments } from '../utils/parseData';



interface CommentState{
  comments: CommentBodyType[],
  nextPageToken: string | null
}

function Comments({ videoId }: { videoId?: string }) {
  const [ commentList, setCommentList ] = useState<CommentState>({comments: [], nextPageToken: null}) 

  const fetchComments = async () => {
    try {
      const commentsResponse = await getVideoComments(videoId!, commentList!.nextPageToken!)
      const items = commentsResponse.items

      const commentsData = parseComments(items)


      
      setCommentList(prev => ({
        comments: [...prev.comments, ...commentsData],
        nextPageToken: commentsResponse.nextPageToken
      }))

    } catch (error) {
      console.error(`Error fetching the comments`)
    }
  }

  useEffect(() => {
    if (videoId) {
      fetchComments()
    }
  }, [videoId])

  return (
    <div className='flex flex-col gap-2 mt-3'>
      <h1 className='px-4 text-lg font-semibold sm:text-xl md:text-2xl'>Comments</h1>
      {
         commentList?.comments?.map((comment: any, ind) => 
          <CommentCard key={ind} comment={comment} />
         )
      }
      <button 
      className='text-gray-400 hover:underline'
      onClick={() => fetchComments()}
      >
        Show more...
      </button>
      
    </div>
  )
}

export default Comments
