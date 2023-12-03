import axios from 'axios';
import React, { useEffect, useState,useContext} from 'react'
import {AdminContext} from '../../context/AdminContext'
import { useParams,Link,useNavigate} from 'react-router-dom'
import { UserContext} from '../../context/userContext'
import {format} from 'date-fns'
import { toast } from 'react-hot-toast';
import Header from '../Header';
const View = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const deleteArticle = async () => {
    try {
      await axios.delete(`/blog/${id}`);
      toast.success("The article has been deleted")
    navigate('/adminpage');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
    const { Admin,setAdmin } = useContext(AdminContext);
     
     const [blog,setblog]=useState();
     const [sameuser,setsameuser]=useState(false)
     const { user } = useContext(UserContext);
   
   const getblog = async()=>{ 
      await axios.get(`/blog/${id}`).then(({data})=>{ 
       setblog(data);
   })}
   useEffect(()=>{
    getblog();
  console.log(user)
   },[])
  
  return (
    <>
     <div className="nav flex">
       <Link to={"/adminpage"}> <h1>Admin Page</h1></Link>
      
      </div>
    <div >
   
          <div className='viewpost'>
          <button className='btnR' onClick={deleteArticle}>
          Delete Article
        </button>
      <h2 className='title'>{blog&&blog.Title}</h2>
      {blog&&<Link to={`/page/${blog.userId}`}>
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

export default View