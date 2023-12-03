import {UserContext} from '../context/userContext'
import { Link } from 'react-router-dom'
import { React, useContext} from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios'
const Header = () => {

  const { user,setUser } = useContext(UserContext);
  const logout = async ()=>{ 
    try {
      const response = await axios.get('/logout', {
        withCredentials: true,
      });
      if (response.status === 200) {
        // Logout was successful on the server
        toast.success('Logout successful')
        
        setUser(null); // Update the user context to null
      } else {
        // Handle any other response status code appropriately
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  return (
    <div className='Header'>
      <Link to="/"><h1 className='logo'>MyArticles</h1></Link>
      <nav>
      <Link to="/" >Home</Link>
       {!user && <Link to="/login">Login</Link>}
       {!user &&  <Link to="/register">Regiter</Link>}
       {user&& user._id &&  <Link to={`/profile/${user._id}`}> myprofile</Link>}
       {user &&  <Link to="/" onClick={logout} >Logout</Link>}
      </nav>
    </div>
  )
}

export default Header