import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios';


const Posts = () => {
  const [posts,setposts]=useState();
  const getposts= async()=>{
 const Posts= await axios.get('/Post')

 setposts(Posts.data);

}


useEffect(()=>{
  getposts();
},[])

  return (
   <div className='posts' id='Posts'>
  
    <h1 className='latest'>Latest articles</h1>
  
      
    
        <div  className="container" >
       {!!posts && [...posts].reverse().map(post=>(
       <Post  key={post._id} {...post} />
       )
        
       )}
       </div>
   </div>
  
 
  )
       }

export default Posts