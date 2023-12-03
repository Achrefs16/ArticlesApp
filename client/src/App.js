
import axios from 'axios';
import './App.css';

import Login from './components/Login';
import Adminlogin from './components/admin/Adminlogin';
import { Toaster } from 'react-hot-toast'
import Register from './components/Register';
import Section from './components/Section';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { AdminContextProvider } from './context/AdminContext';

import CreatePost from './components/CreatePost';
import Viewpost from './components/Viewpost';
import { Profile } from './components/Profile';
import Adminregister from './components/admin/Adminregister';
import Adminpage from './components/admin/Adminpage';
import Requireaut from './context/Requireaut';
import Admin from './components/admin/Admin';
import Pro from './components/admin/Pro';
import View from './components/admin/View';
function App() {
  axios.defaults.baseURL='http://localhost:5001';
  axios.defaults.withCredentials=true;
  return (
    <AdminContextProvider>
    <UserContextProvider>
     
    <div className="Main">
   
      <Toaster position='bottom-right' toastOption={{duration: 3000}}></Toaster>
      <Routes>
        <Route path='/' element={ <Section/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/adminlogin' element={ <Adminlogin/>}/>
        <Route path='/adminregister' element={ <Adminregister/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/adminpage' element={<Adminpage/>}/>
        <Route path='/blog/:id' element={<Viewpost/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/pagepo/:id' element={<View/>}/>
        <Route path='/page/:id' element={<Pro/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route element={<Requireaut/>}>
        <Route path='/CreatePost' element={ <CreatePost/>}/>
        
         
       </Route>

      </Routes>
    
    </div>

    </UserContextProvider>
    </AdminContextProvider>
 
  );
}

export default App;
