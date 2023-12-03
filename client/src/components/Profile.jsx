import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import Post from './Post'
import img from './png2.png'
import { useParams,Link } from 'react-router-dom'
import { UserContext} from '../context/userContext'
import Header from './Header';
export const Profile = () => {


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

  return (<>
    <Header/>
    <div className='profile'>
   
    <div className='sec1'>
        <img src={img} alt="" />
        {profile && <h1>{profile.Fullname}</h1>}

        
    </div>
    <div className='sec2'>
     {sameuser &&  <Link to="/CreatePost"><button className='btn2'>Create new article</button></Link>} 
        <div className='posts'>
          <h2>List of Articles</h2>
  <div className="container">
     {!!posts && [...posts].reverse().map(post=>(
      <Post {...post}/>
     )
      
     )}
   
 </div>

  </div>
    </div>
  
    </div>
    </>  )
}
