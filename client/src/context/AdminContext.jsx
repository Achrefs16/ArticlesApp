import axios from 'axios'
import { createContext,useState,useEffect } from 'react'

export const AdminContext = createContext({})

export const AdminContextProvider =({children})=>{
    const [Admin,setAdmin]=useState(null);
    useEffect(() => {
        if (!Admin) {
          axios.get('/admin').then(({ data }) => {
            console.log(data);
            setAdmin(data);
          });
        }
      }, [Admin]); 
    
    return(
        <AdminContext.Provider value={{Admin,setAdmin}}>
            {children}
        </AdminContext.Provider>

    )
}