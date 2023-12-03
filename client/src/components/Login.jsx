import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import {UserContext} from '../context/userContext'
import { toast } from 'react-hot-toast';
import Header from './Header';

const Login = () => {
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();
 
  const [data, setdata] =useState({
    Username :'',
    Password:'',
  })

  const loginUser =async(e)=>{
   e.preventDefault()
 
   const {Username,Password}=data
   try {

    const {data}=await axios.post('/login',{
      Username,Password
    })
    if(data.error){
     toast.error(data.error)
    }
   else{
    setUser(data)
    toast.success('Login successful Welcome')
      navigate('/');
   }

   } catch (error) {
    
   }

  }
  return (
    <>
    <Header/>
    <div className='loginpage'>
        <form className='form' onSubmit={loginUser}>
        <h1>Login</h1>
        <input type="text" name="Username"  placeholder='User Name'  value={data.Username} onChange={(e)=>setdata({...data, Username:e.target.value})}/>
      
        <input type="password" placeholder='Password' value={data.Password } onChange={(e)=>setdata({...data, Password:e.target.value})}/>
        <input type="submit" className='btn' value="Login" />
        
        </form>
       
    </div>
    </>
  )
}

export default Login