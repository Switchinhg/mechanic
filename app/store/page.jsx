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
import { AlignHorizontalDistributeCenter, BatteryCharging, Brush, Car, CheckSquare, Clock, Cpu, Disc, DollarSign, Facebook, FacebookIcon, Fuel, Hammer, Instagram, Linkedin, Mail, MapPin, MonitorSmartphone, Package, Phone, Rocket, Star, Thermometer, Truck, Twitter, Wrench, Zap } from "lucide-react"
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

import placeholder_image from "../../public/placeholder_shop.png"
import ModalAddService from '../Components/ModalAddService/ModalAddService'
import ModalAddSocial from '../Components/modalAddSocial/ModalAddSocial'

export default /* async */ function page() {

    const {user}= useUserContext()
    const [stores, setStores] = useState()
    const [modalCreateStore, setModalCreateStore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [addService, setAddService] = useState(false)
    const [AllService, setAllService] = useState([])
    const [modalSocials, setmodalSocials] = useState(false)

    const [currentSocial, setCurrentSocial] = useState("")

    
    const getAllServices = async () =>{
      let request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/servicios/",{
          method:"GET",
      })
      let services = await request.json()
      if(services.success){
        setAllService(services.data)
        setLoading(false)
      }else{

      }
    }
    const getstores = async (email)=>{
        let request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/tiendas/"+ email,{
            method:"GET",
        })
        let stores = await request.json()
        setStores(stores)
        setLoading(false)
    }
    useEffect(() => {
        if(user?.email){
            getstores(user?.email)
            getAllServices()
        }
    }, [user])

    useEffect(()=>{
        if(user?.email && !addService){
            getstores(user?.email)
            setLoading(true)
        }
        if(user?.email && !addService){
            getstores(user?.email)
            setLoading(true)
        }
      },[modalCreateStore, addService])

      const cashFormatter = (cash) =>{
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'UYU',
        });
        return formatter.format(cash)
      } 

      const ModalAddSocials = (e)=>{
        setCurrentSocial(e)
        setmodalSocials(true)
      }

  return (
    <div className={store.wrapper}>
        {/* <SideBar /> */}

        {
            !loading?
                stores?.success?
                <div className={store.zero_stores}>
                    <h1>¡No tenés ninguna tienda!</h1>
                    <p>Click <Button variant={"outline"} onClick={()=>setModalCreateStore(true)}>Aquí</Button> para crear una!</p>
                </div>
                :
                <div className="container mx-auto p-4 space-y-6">
                {/* Header Section */}
                <div className={store.store_options}>
                        <Button variant={"outline"} onClick={()=>setAddService(true)}>Agregar o quitar servicio</Button>
                        <Select onValueChange={e=>ModalAddSocials(e)}>
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
                <div className={` flex flex-col md:flex-row items-center gap-6  p-6 rounded-lg shadow-lg ${store.bg}`}>

                  <Image
                    src={placeholder_image}
                    alt={`${stores?.data[0].store } Logo`}
                    width={150}
                    height={150}
                    className="rounded-full border bg-white"
                  />
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-3xl font-bold">{stores?.data[0].store } </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      {/* <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" /> */}
                      <span className="font-semibold"><Rating  /> </span>
                      {/* <span className="text-muted-foreground">(256 reviews)</span> */}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{stores?.data[0].address}</span>
                    </div>
                  </div>
                </div>
          
                {/* Social Media Links */}
                {/* <div className="flex justify-center space-x-4">
                  <a href="#" className="text-primary hover:text-primary-foreground transition-colors">
                    <FacebookIcon className="w-6 h-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-foreground transition-colors">
                    <Twitter className="w-6 h-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="w-6 h-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div> */}
          

          
                {/* Map Section */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`${store.aspect} bg-muted rounded-md flex items-center justify-center `}>
                      <MapPin className="w-12 h-12 text-primary" />
                      <span className="ml-2 text-lg font-semibold">Map Placeholder</span>
                    </div>
                  </CardContent>
                </Card> */}
          
                {/* Services Section */}
                <Card className={`${store.bg}`}>
                  <CardHeader>
                    <CardTitle>Nuestros servicios</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 max-h-[336px] overflow-y-scroll">
                      {stores?.data[0].services?.map((el, index)=>
                        <div className="flex items-center justify-between gap-4 w-100 border-b-4 border-gray pb-5">
                          <div className="flex items-center gap-4">
                            <Wrench className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="font-semibold"> {AllService.length > 0?AllService?.filter(e=>e.id == el.id)[0].name:""}</h3>
                                <p className="text-sm text-muted-foreground">{AllService.length > 0?AllService?.filter(e=>e.id == el.id)[0].desc:""}</p>
                            </div>
                          </div>
                          <div>
                              <p className="text-sm">Precios varian entre { cashFormatter(el.price_min) } y { cashFormatter(el.price_max)  }</p>
                          </div>
                        </div>
                      )}
                      {stores?.data[0].services?
                      null:
                      <p>En este perfil todavia no ha configurado ningun servicio.</p>}
{/* 
                        <div className="flex items-center gap-4">
                        <Brush className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Chapa y pintura</h3>
                            <p className="text-sm text-muted-foreground">Restauración y retoque estético del vehículo</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Fuel className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Cambio de aceite y filtros</h3>
                            <p className="text-sm text-muted-foreground">Mantenimiento preventivo para el motor</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <AlignHorizontalDistributeCenter className="w-8 h-8 text-primary"/>
                        <div>
                            <h3 className="font-semibold">Alineación y balanceo</h3>
                            <p className="text-sm text-muted-foreground">Ajuste preciso para una conducción segura</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Disc className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Reparación de frenos</h3>
                            <p className="text-sm text-muted-foreground">Optimización del sistema de frenado</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Car className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Revisión y cambio de llantas</h3>
                            <p className="text-sm text-muted-foreground">Evaluación y sustitución de neumáticos</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Cpu className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Diagnóstico y reparación de motor</h3>
                            <p className="text-sm text-muted-foreground">Detección y solución de problemas del motor</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Wrench className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Reparación de suspensión</h3>
                            <p className="text-sm text-muted-foreground">Mejora de la estabilidad y confort de manejo</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Thermometer className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Aire acondicionado y climatización</h3>
                            <p className="text-sm text-muted-foreground">Reparación y recarga del sistema de aire</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Zap className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Electricidad automotriz</h3>
                            <p className="text-sm text-muted-foreground">Solución de fallas eléctricas en el vehículo</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Wrench className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Reparación de transmisión</h3>
                            <p className="text-sm text-muted-foreground">Reparación y ajuste de la caja de cambios</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <BatteryCharging className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Cambio de batería</h3>
                            <p className="text-sm text-muted-foreground">Sustitución rápida para un encendido confiable</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <MonitorSmartphone className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Escaneo y diagnóstico computarizado</h3>
                            <p className="text-sm text-muted-foreground">Análisis digital para detectar fallas</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Wrench className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Afinación de motor</h3>
                            <p className="text-sm text-muted-foreground">Mejora del rendimiento y eficiencia del motor</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Wrench className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Reparación de parabrisas</h3>
                            <p className="text-sm text-muted-foreground">Arreglo de grietas y sustitución de cristales</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Package className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Instalación de accesorios</h3>
                            <p className="text-sm text-muted-foreground">Colocación de dispositivos y personalización</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <CheckSquare className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Revisión técnica pre-compra</h3>
                            <p className="text-sm text-muted-foreground">Inspección detallada antes de la compra</p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <Truck className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="font-semibold">Servicio de grúa</h3>
                            <p className="text-sm text-muted-foreground">Asistencia en carretera y traslado de vehículos</p>
                        </div>
                        </div> */}

                  </CardContent>
                </Card>
          
                {/* Additional Information */}
                <Card className={`${store.bg}`}>  
                  <CardHeader>
                    <CardTitle>Información del taller</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM, Sun: Closed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Número</h3>
                      <p className="text-sm text-muted-foreground">{stores?.data[0].phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">Payment Methods</h3>
                        <p className="text-sm text-muted-foreground">Cash, Credit Cards, Debit Cards, Financing Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact and On-Site Assistance Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Rocket className="w-4 h-4 mr-2"/>
                    {/* <Mail  /> */}
                    Publicar tienda
                  </Button>
                  {/* <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Wrench className="w-4 h-4 mr-2" />
                    Request On-Site Assistance
                  </Button> */}
                </div>
              </div>
            :
                <>Loading...</>
        }

        {modalCreateStore?
            <StoreModal open={modalCreateStore} setOpen={setModalCreateStore}/> 
        :   
            <></>
        }
        {addService && (
        <ModalAddService open={addService} setOpen={setAddService} services={stores?.data[0].services} owner={stores.data[0].owner}/> 
      )}
        {modalSocials && (
            // open, setOpen,name,socials
        <ModalAddSocial open={modalSocials} setOpen={setmodalSocials} services={stores?.data[0].socials} name={stores.data[0].store} socials={currentSocial} email={user?.email}/> 
      )}
    </div>
  )
}
