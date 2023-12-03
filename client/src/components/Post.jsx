import React from 'react'
import {format} from 'date-fns'
import { Link } from 'react-router-dom'
const Post = ({_id,userId,Fullname,Title,Summary,Content,cover,createdAt}) => {
  console.log(cover)

  return (
    <>
    <Link to={`/blog/${_id}`}>
    <div className='post'>
      
        <div className="image">
            <img  className='imgb' src={'http://localhost:5001/'+cover} alt="" />
        </div>
        <div className="text">
            <h1>{Title}</h1>
            <p className='info'>
                <a href=""className='auther'>{Fullname}</a>
                <span>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</span>
            </p>
            <p className='summary'>{Summary}</p>
         
        </div>
      
    </div>
    </Link>
   
       </>
  )
}

export default Post