import { React, useContext} from 'react'
import img from './img.png'
import Posts from './Posts';
import Header from './Header'
import {UserContext} from '../context/userContext'
import { Link } from 'react-router-dom'
import Contact from './Contact';


const Section = () => {
  const { user,setUser } = useContext(UserContext);
  return (
    <>
       <Header/>
    <div className='section'>
        <div className="col1">
            <h1 className='h1'>Welcome to our website {user&&user.Fullname}</h1>
            <p className='description'> where we explore the latest trends, share expert insights, and provide valuable information on a wide range of topics that matter to you.</p>
           <a href="#Posts"> <button className='btn'>EXPLORE</button></a>
           {user&&<Link to="/CreatePost"><button className='btn1'>Create new article</button></Link>} 
        </div>
        <div className="col2"><img src={img} alt="" /></div>
     
    </div>
   
  
       <Posts></Posts>
       
       </>
  )
}

export default Section