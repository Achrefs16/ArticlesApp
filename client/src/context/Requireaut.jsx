import { useLocation,Navigate,Outlet } from "react-router-dom";
import { React, useContext} from 'react'
import {UserContext} from './userContext'

const Requireaut=()=>{
    const { user,setUser } = useContext(UserContext);
    const location=useLocation();
    return (
    user 
    ? <Outlet></Outlet>
    : <Navigate to='/login' state={{from: location}} replace></Navigate>

    )
}

export default Requireaut