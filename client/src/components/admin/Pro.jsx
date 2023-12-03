import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import Post from '../Post'
import img from '../png2.png'
import { useParams,Link } from 'react-router-dom'
import { UserContext} from '../../context/userContext'
import Header from '../Header';
import {format} from 'date-fns'
const Pro = () => {
    const { user } = useContext(UserContext);

    const [sameuser,setsameuser]=useState(false)
    const {id} =useParams();
    const [posts,setposts]=useState();
    const [profile,setprofile]=useState();
    const getposts= async()=>{
   const Posts= await axios.get(`/Post/${id}`)
  
   setposts(Posts.data);
  
  }
  const getuser= async()=>{
    const prof= await axios.get(`/user/${id}`)
   
    setprofile(prof.data);
   
   }
  useEffect(()=>{
    getuser();
    getposts();
   
  
  },[profile, user])
  useEffect(() => {
    if (profile && user && user._id === profile._id) {
      setsameuser(true);
    }
  }, [profile, user]);

  return ( <>
 <div className="nav flex">
       <Link to={"/adminpage"}> <h1>Admin Page</h1></Link>
      
      </div>
    <div className='profile'>
   
    <div className='sec1'>
        <img src={img} alt="" />
        {profile && <h1>{profile.Fullname}</h1>}

        
    </div>
    <div className='sec2'>
     {sameuser &&  <Link to="/CreatePost"><button className='btn2'>Create new article</button></Link>} 
        <div className='posts'>
          <h2>Articles</h2>
  <div className="container">
  {!!posts && [...posts].reverse().map(post=>(
       <Link to={`/pagepo/${post._id}`}>
       <div className='post'>
         
           <div className="image">
               <img  className='imgb' src={'http://localhost:5001/'+post.cover} alt="" />
           </div>
           <div className="text">
               <h1>{post.Title}</h1>
               <p className='info'>
                   <a href=""className='auther'>{post.Fullname}</a>
                   <span>{format(new Date(post.createdAt),'MMM d, yyyy HH:mm')}</span>
               </p>
               <p className='summary'>{post.Summary}</p>
            
           </div>
         
       </div>
       </Link>
      
       )
        
       )}
   
 </div>

  </div>
    </div>
  
    </div>
    </>
  )
}

export default Pro