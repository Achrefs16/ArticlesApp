import axios from 'axios';
import React, { useEffect, useState,useContext} from 'react'
import {AdminContext} from '../context/AdminContext'
import { useParams,Link,useNavigate} from 'react-router-dom'
import { UserContext} from '../context/userContext'
import { toast } from 'react-hot-toast';
import {format} from 'date-fns'
import Header from './Header';
const Viewpost = () => {

  const navigate = useNavigate();
  const deleteArticle = async () => {
    try {
      await axios.delete(`/blog/${id}`);
  toast.success("The article has been deleted")
    navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  const { Admin,setAdmin } = useContext(AdminContext);
    const {id} =useParams();
   const [blog,setblog]=useState();
   const [sameuser,setsameuser]=useState(false)
   const { user,setUser } = useContext(UserContext);
 
 const getblog = async()=>{ 
    await axios.get(`/blog/${id}`).then(({data})=>{ 
     setblog(data);
 })}
 useEffect(()=>{
  getblog();

 },[])
 useEffect(()=>{
  if(user===null){
      axios.get('/profile').then(({data})=>{
   

      });
  }
},[])

useEffect(()=>{
if (blog&&user && user._id === blog.userId) {
   
  setsameuser(true);
  console.log(sameuser)
}
},[user,blog])
 
  return (
    <><Header/>
    <div >
 
          <div className='viewpost'>
          { sameuser && <button className='btnR' onClick={deleteArticle}>
          Delete Article
        </button>} 
      <h2 className='title'>{blog&&blog.Title}</h2>
      {blog&&<Link to={`/profile/${blog.userId}`}>
      <p className='fullname'>Author : {blog&&blog.Fullname} </p>
      </Link>}
      {blog&&<p className='time'>{format(new Date(blog.createdAt),'MMM d, yyyy HH:mm')}</p>}
     {blog&&<img  className='img' src={'http://localhost:5001/'+blog.cover} alt="" />} 
     {blog&& <div className='content' dangerouslySetInnerHTML={{__html:blog.Content}}></div>} 
    
    </div>

    </div>
   
    </>
  )
}

export default Viewpost