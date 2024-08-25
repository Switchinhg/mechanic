'use client'
import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation';

const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}) =>{
    const router = useRouter();
    

    const [user,setUser] = useState({id:"awewqe",name:"Santiago"})
    const [logged, setLogged] = useState(false)

    const login = async (email,password) =>{
        const request = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({
                action:"login",
                email,
                password
            })
        })
        const response = await request.json();
        if(response.success){
            router.push('/loading');
            setTimeout(() => {
                setLogged(true)
                router.push('/');
            }, 2000);
        }
    }

    const logout = async () =>{
        setLogged(false) 

    }

    const register = async (email,password) =>{
        const request = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            body:JSON.stringify({
                action:"register",
                email,
                password
            })
        })
        const response = await request.json();
        if(response.success){
            router.push('/loading');
            setTimeout(() => {
                setLogged(true)
                router.push('/');
            }, 2000);
        }
        
    }
    return (
        <UserContext.Provider value={{login,logout,register,logged}}>
            {children}
        </UserContext.Provider>
    )
}