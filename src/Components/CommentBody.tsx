import { AiOutlineLike } from "react-icons/ai";
import { CommentBodyType } from '../utils/Types';

function CommentBody({ item }: { item: CommentBodyType }) {
  return (
    <div>
      <div className="flex gap-2 sm:gap-3">
            <img src={item.authorProfile} className="sm:w-10 w-9 aspect-[1/1] h-fit rounded-full" alt="" />
            <div className="">
               <h1 className='text-md'>{item.authorName}</h1>
               <h2 className='whitespace-pre-line text-neutral-300'>{item.commentText}</h2>
               <div className="flex items-center gap-1 cursor-pointer text-neutral-400">
                  <AiOutlineLike />
                  {item.commentLikes}
               </div>
            </div>
         </div>
    </div>
  )
}

export default CommentBody
