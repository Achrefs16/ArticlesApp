import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
const Adminregister = () => {

    const navigate = useNavigate();
    const [data, setdata] =useState({
      Fullname :'',
      Username :'',
      Password:'',
    })
    const registerUser = async(e)=>{
      e.preventDefault();
      const {Fullname, Username,Password}=data
      try {
        const {data}= await axios.post('/adminregister',{
          Fullname, Username,Password
        })
        if (data.error){
       toast.error(data.error)
        }else{
          setdata({})
          toast.success('congratulations your account has been successfully created')
          navigate('/adminlogin')
        }
      } catch (error) {
        
      }
    }
  
    return (
      <div className='registerpage'>
          <form className='form' onSubmit={registerUser}>
          <h1>Admin Register</h1>
          <input type="text" name="Fullname"  placeholder='Full Name'   value={data.Fullname} onChange={(e)=>setdata({...data, Fullname:e.target.value})}/>
          <input type="text" name="Username"  placeholder='User Name'  value={data.Usernameame} onChange={(e)=>setdata({...data, Username:e.target.value})}/>
        
          <input type="password" placeholder='Password'  value={data.Password } onChange={(e)=>setdata({...data, Password:e.target.value})}/>
          <input type="submit" className='btn' value="Register" />
          
          </form>
          </div>
    )
  }
  
  export default Adminregister