'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/sidebar/page'
import store from './store.module.css'
import Link from 'next/link'
import { useUserContext } from '../Components/context/UserContext'
import { Button } from '@/components/ui/button'
import StoreModal from '../Components/create-store-modal/StoreModal'

export default /* async */ function page() {

    const {user}= useUserContext()
    const [stores, setStores] = useState()
    const [modalCreateStore, setModalCreateStore] = useState(false)
    const [loading, setLoading] = useState(true)


    const getstores = async (email)=>{
        let request = await fetch("http://localhost:3000/api/tiendas/"+ email,{
            method:"GET",
        }
    )
    let stores = await request.json()
    setStores(stores)
    setLoading(false)
}
    useEffect(() => {
        if(user?.email){
            getstores(user?.email)
        }
    }, [user])

    useEffect(()=>{
        if(user?.email){
            getstores(user?.email)
            setLoading(true)
        }
      },[modalCreateStore])
    
  return (
    <div className={store.wrapper}>
        {/* <SideBar /> */}

        {
            !loading?
                stores.success?
                <div className={store.zero_stores}>
                    <h1>¡No tenés ninguna tienda!</h1>
                    <p>Click <Button variant={"outline"} onClick={()=>setModalCreateStore(true)}>Aquí</Button> para crear una!</p>
                </div>
                :
                <>Mostrar</>
            :
                <>Loading...</>
        }

        {modalCreateStore?
            <StoreModal open={modalCreateStore} setOpen={setModalCreateStore}/> 
        :   
            <></>
        }
    </div>
  )
}
