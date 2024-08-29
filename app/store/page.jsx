'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/sidebar/page'
import store from './store.module.css'
import Link from 'next/link'
import { useUserContext } from '../Components/context/UserContext'

export default /* async */ function page() {

    const {user}= useUserContext()
    const [stores, setStores] = useState()
    console.log(user)
    useEffect(() => {
        const getstores = async ()=>{
            let request = await fetch("http://localhost:3000/api/tiendas/" + user?.email)
            let stores = await request.json()
            setStores(stores)
      }
      getstores()
    }, [user])
    
    console.log(stores?.stores)
  return (
    <div className={store.wrapper}>
        {/* <SideBar /> */}

        {
            stores?.stores == 0?
                <div className={store.zero_stores}>
                    <h1>¡No tenes ninguna tienda!</h1>
                    <p>Click <Link href={"/create-store"}>aquí</Link> para crear una!</p>
                </div>
            :
                <></>
        }
    </div>
  )
}
