'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RedirectType, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';


const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}) =>{
    const router = useRouter();
    const auth = getAuth(app);
    

    const [user,setUser] = useState(null)
    const [logged, setLogged] = useState(false)
    
    // console.log(user?.uid )//get user UID

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser({
                    email:user.email,
                    uid:user.uid,
                    accessToken:user.accessToken,
                    display_name:user.displayName,
                    email_verified:user.emailVerified,
                    last_login:user.metadata.lastLoginAt
                })
                setLogged(true);
            }
          });
      
          return () => unsubscribe();
    }, [])

    const setUserDataInDB = async (InitialData) =>{
        const userData = collection(db, "users");
        // Save the template data to the collection
        await addDoc(userData, InitialData);
      }
    

    const login = async (email,password) =>{
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
                setUser({
                    email:user.email,
                    uid:user.uid,
                    accessToken:user.accessToken,
                    display_name:user.displayName,
                    email_verified:user.emailVerified,
                    last_login:user.metadata.lastLoginAt
                })
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
            setUser(null)
            router.push('/');
        }).catch((error) => {
        });
    }

    const register = async (email,password) =>{

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user 
            if(user.uid){
                setUserDataInDB({
                    email:email,
                    lastname:"",
                    name:"",
                    stores:0,
                    tier:"basic"
                  })   
                  setUser({
                    email:user.email,
                    uid:user.uid,
                    accessToken:user.accessToken,
                    display_name:user.displayName,
                    email_verified:user.emailVerified,
                    last_login:user.metadata.lastLoginAt
                })
                setLogged(true)
                router.push('/');
            }
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