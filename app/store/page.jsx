'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/sidebar/page'
import store from './store.module.css'
import Link from 'next/link'
import { useUserContext } from '../Components/context/UserContext'
import { Button } from '@/components/ui/button'
import StoreModal from '../Components/create-store-modal/StoreModal'
import Rating from '../Components/ShopRating/Rating'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail } from "lucide-react"
import { Checkbox } from '@/components/ui/checkbox'

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
                <div className={store.store_config}>
                    <div className={store.store_options}>
                        <Button variant={"outline"}>Agregar Servicio</Button>
                        <Button variant={"outline"}>Quitar Servicio</Button>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Agregar red social" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Agregar Red Social</SelectLabel>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                    <SelectItem value="tiktok">TikTok</SelectItem>
                                </SelectGroup>
                            </SelectContent >
                        </Select>

                    </div>
                    <h1>Mostrando vista previa</h1>
                    <div className={store.store_config_preview}>
                        <div className={store.store_header}>
                            <h2>{stores.data[0].store}</h2> 

                            <div className={store.img_shop}>
                                <img src="" alt="" />
                            </div>
                            <div className={store.rating}><p>msPuntaje</p> <span><Rating sales={1} reviews={{1:2,2:1,3:5,4:20,5:17}} responseTimeAvg={240} createdAt={stores.data[0].createdAt}/></span></div>
                        </div>
                        <div className={store.store_socials}>
                        </div>

                        <div className={store.contact_map_wrap}>
                            <div className={store.area}>
                                Map es para una actualizacion futura
                            </div>
                            <div className={store.contact}>
                                <h2>Contacto</h2>
                                <Button > 
                                    <Mail className="mr-2 h-4 w-4" /> Enviar Mensaje
                                </Button>
                            </div>

                        </div>

                        <div className={store.services}>

                            <h2>Services</h2>

                                <div className={store.services_list}>
                                
                                <div className="items-top flex space-x-2">
                                    <Checkbox id="terms1" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept terms and conditions
                                            <p className="text-sm text-muted-foreground">
                                                You agree to our Terms of Service and Privacy Policy.
                                            </p>
                                        </label>
                                    </div>
                                </div>
                                <div className="items-top flex space-x-2">
                                    <Checkbox id="terms1" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept terms and conditions
                                            <p className="text-sm text-muted-foreground">
                                                You agree to our Terms of Service and Privacy Policy.
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>      

                        </div>
                        

                    </div>

                    <Button className={store.save_button}>Guardar Perfil</Button>
                </div>
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
