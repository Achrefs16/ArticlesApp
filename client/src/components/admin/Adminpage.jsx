import React, { useEffect, useState, useContext} from 'react'
import {AdminContext} from '../../context/AdminContext'
import {UserContext} from '../../context/userContext'
import { useParams, useNavigate,Link } from 'react-router-dom';
import {format} from 'date-fns'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Posts from '../Posts'

const Adminpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteArticle = async () => {
    try {
      await axios.delete(`/blog/${id}`);
  
    navigate('/adminpage');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  const [posts,setposts]=useState();
  const getposts= async()=>{
 const Posts= await axios.get('/Post')

 setposts(Posts.data);

}


useEffect(()=>{
  getposts();
},[])

 
  const { user,setUser } = useContext(UserContext);
  //const [ Admin,setAdmin ] = useContext(AdminContext);
 
    const [users,setusers]=useState([]);
    const logout = async ()=>{ 
      try {
        const response = await axios.get('/logout', {
          withCredentials: true,
        });
        if (response.status === 200) {
          // Logout was successful on the server
          toast.success('Logout successful')
          setUser(null);
       
          navigate('/admin') // Update the user context to null
        } else {
          // Handle any other response status code appropriately
          toast.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
   
    const getusers= async()=>{
   const users= await axios.get('/user')

   setusers(users.data);
  
  }
 
  useEffect(()=>{
    getusers();
  },[])
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/user/${userId}`);
      // Update the list of users after deletion
      setusers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div >
      <div className="nav flex">
      <Link to={"/adminpage"}> <h1>Admin Page</h1></Link>
        <button className='btn2' onClick={logout}>logout</button>
      </div>
      <div className="listuser">
    <h2>List of Users:</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.Fullname}</strong> 
          <p>Username : {user.Username}</p> 
          <button onClick={() => deleteUser(user._id)} className='btnR'>Delete</button>
        </li>
      ))}
    </ul>
    </div>
    <div className='adminpost'>
    <h2>List of Articles:</h2>
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
  )
}

export default Adminpage