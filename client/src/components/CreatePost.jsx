import React, { useContext, useState } from 'react'
import ReactQuill from'react-quill'
import axios from 'axios';
import {UserContext} from '../context/userContext'
import'react-quill/dist/quill.snow.css'
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';


const CreatePost = () => {
  const navigate = useNavigate();
  const [files, setfiles]=useState('');
  const [Title, setTitle] =useState('')
  const [Summary, setSummary] =useState('')
  const [Content, setContent] =useState('')
  const [userId,setuserId]=useState('')
  const { user } = useContext(UserContext);




  const CreateNewPost= async(e)=>{
    if(!!user){
     
    const data= new FormData()
    data.set('userId',user._id)
    data.set('Fullname',user.Fullname)
    data.set('Title',Title)
    data.set('Summary',Summary)
    data.set('Content',Content)
    data.set('file',files)
  
    e.preventDefault();
    
  try {
    const {res}=await axios.post('/post',data)
    toast.success('Article added')
    navigate('/');
   if(res.error){

    }
    else{
    
    }
  } catch (error) {
    
  }
  
    }
}
  return (
    <>
    <Header/>
    <div className='CreatePost'>
        <form action="" className='form' onSubmit={CreateNewPost}>
            <h1>Create Article</h1>
            <input type="text" placeholder='Title' required value={Title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder='Summary' required value={Summary} onChange={(e)=>setSummary(e.target.value)}/>
            <input type="file" required onChange={(e)=>setfiles(e.target.files[0])} />
            <ReactQuill value={Content}  required onChange={newValue=> setContent(newValue)}/>
         <input type="submit" value="Post" />
        </form>
    </div>
    </>
  )
}

export default CreatePost