'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RedirectType, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/firebase/config';


const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}) =>{
    const router = useRouter();
    const auth = getAuth(app);
    

    const [user,setUser] = useState(null)
    const [logged, setLogged] = useState(false)


    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                setLogged(true);
            }
          });
      
          return () => unsubscribe();
    }, [])
    

    const login = async (email,password) =>{
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
                setUser(user)
                setLogged(true)
                router.push('/');

        } catch (error) {
            const errorMessage = error.message;
            return { success: false, message: errorMessage}
        }
    }

    const logout = async () =>{
        signOut(auth).then(() => {
            setLogged(false)
        }).catch((error) => {
        });
    }

    const register = async (email,password) =>{

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user 
                setUser(user)
                setLogged(true)
                router.push('/');
        }catch(error){
            const errorMessage = error.message;
            return { success: false, message: errorMessage}
        }
    }
    return (
        <UserContext.Provider value={{login,logout,register,logged,user}}>
            {children}
        </UserContext.Provider>
    )
}