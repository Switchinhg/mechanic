'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { RedirectType, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';


const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) =>{
    
    const [cart,setCart] = useState([])
    
    const addToCart = (itemID) =>{
        setCart([itemID, ...cart ])
    }
    const removeFromCart = (itemID) =>{
        setCart(cart.filter(e => e != itemID))
    }
    const clearCart = () =>{
        setCart([])
    }
    

    return (
        <CartContext.Provider value={{addToCart, removeFromCart, clearCart, cart}}>
            {children}
        </CartContext.Provider>
    )
}