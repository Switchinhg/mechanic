'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { AlignHorizontalDistributeCenter, BatteryCharging, Brush, Car, CheckSquare, Clock, Cpu, Disc, DollarSign, Facebook, FacebookIcon, Fuel, Hammer, Instagram, Linkedin, Mail, MapPin, MonitorSmartphone, Package, Phone, Star, Thermometer, Truck, Twitter, Wrench, Zap } from "lucide-react"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import store from './store.module.css'

 


export default function ModalAddService({open, setOpen, services}) {
    const [newServicios, setNewServicios] = useState([])
    const [servicios, setServicios] = useState([])
    
    /* Get Services */


    const AddNewService = async (e) =>{
       /* Post to add services */
    }

    const getServices = async () =>{
        let request = await fetch( process.env.NEXT_PUBLIC_URL + "/api/servicios" )
          let resp = await request.json()
      
          if(resp.success){
            setServicios(resp.data)
          }
        }

        const changeAddService = (e) =>{
            console.log("Hola")
            const hasId = newServicios.some((servicio) => servicio.id === e);
            const nombreServicio = servicios.find((servicio) => servicio.id === e);
            if(!hasId){
                setNewServicios([...newServicios, {id:e,name:nombreServicio.name}])
            }
        }
    useEffect(() => {
        getServices()
    }, [])
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {/* <Button variant="outline">Edit Profile</Button> */}
    </DialogTrigger>
    <DialogContent className={`${store.bg} sm:max-w-[425px]`} >
      <DialogHeader>
        <DialogTitle>Agregar nuevo servicio.</DialogTitle>
        <DialogDescription>
          Tiene {newServicios.length} servicios guardados.
          <div style={{paddingTop:10}}>
            {newServicios.map((el, index)=>
                <div key={index} >
                    <p style={{paddingLeft:10}}>- {el.name}</p>
                </div>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
            <Select onValueChange={(e)=>changeAddService(e)}>
            <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Seleccionar un servicio" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                
                    {servicios.map((el, index) =>
                        <SelectItem key={index} value={el.id}> {newServicios.some((servicio) => servicio.id === el.id)?"V":"N"} - {el.name}</SelectItem>
                    )}
                    {servicios.length==0?"Cargando...": null}
                </SelectGroup>
            </SelectContent>
            </Select>



      <DialogFooter>
        <Button onClick={AddNewService}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
