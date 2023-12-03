import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import {AdminContext} from '../../context/AdminContext'
import { toast } from 'react-hot-toast';
const Adminlogin = () => {
    const navigate = useNavigate();
    const { Admin,setAdmin } = useContext(AdminContext);
    const [data, setdata] =useState({
      Username :'',
      Password:'',
    })
    const loginUser =async(e)=>{
        e.preventDefault()
      
        const {Username,Password}=data
        try {
     
         const {data}=await axios.post('/adminlogin',{
           Username,Password
         })
         if(data.error){
          toast.error(data.error)
         }
        else{
         setAdmin(data)
         toast.success('Login successful Welcome')
           navigate('/adminpage');
        }
     
        } catch (error) {
         
        }
     
       }
  return (
    <div className='admin'> 
        <form className='form' onSubmit={loginUser}>
    <h1>Admin Login</h1>
    <input type="text" name="Username"  placeholder='User Name'  value={data.Username} onChange={(e)=>setdata({...data, Username:e.target.value})}/>
  
    <input type="password" placeholder='Password' value={data.Password } onChange={(e)=>setdata({...data, Password:e.target.value})}/>
    <input type="submit" className='btn' value="Login" />
    
    </form>
    </div>
  )
}

export default Adminlogin