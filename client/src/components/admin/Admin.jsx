import React from 'react'
import { Link } from 'react-router-dom'
const Admin = () => {
  return (
    <div className='admin'>
       <Link to="/adminlogin">   <button  className="btn1" >Login</button> </Link> 
       <Link to="/adminregister" > <button  className="btn1"> Register</button> </Link>
       <Link to="/" > <button  className="btn1">Home page</button> </Link>
      
    </div>
  )
}

export default Admin