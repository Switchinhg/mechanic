'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { AlignHorizontalDistributeCenter, BatteryCharging, Brush, Car, Check, CheckSquare, Clock, Cpu, Disc, DollarSign, Facebook, FacebookIcon, Fuel, Hammer, Instagram, Linkedin, Mail, MapPin, MonitorSmartphone, Package, Phone, Star, Thermometer, Truck, Twitter, Wrench, X, Zap } from "lucide-react"
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
  import { toast } from "@/components/ui/use-toast"

 


export default function ModalAddService({open, setOpen, services , owner}) {
    const [newServicios, setNewServicios] = useState([])
    const [servicios, setServicios] = useState([])
    
    /* Get Services */




    const getServices = async () =>{
        let request = await fetch( process.env.NEXT_PUBLIC_URL + "/api/servicios" )
          let resp = await request.json()
      
          if(resp.success){
            setServicios(resp.data)
          }
        }
    const saveServices = async () =>{
        let request = await fetch( process.env.NEXT_PUBLIC_URL + "/api/servicios",{
          method:"PATCH",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({ owner, services:newServicios }),
            
          })
          let resp = await request.json()
      
          if(resp.success){
            toast({
              title: "Servicios guardados",
              description: resp.message,
              status: "success",
            });
            setOpen(false)
          }
        }

        const changeAddService = (e) =>{
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
                <div key={index} className={store.service_price}>
                    <p style={{paddingLeft:10}}>- {el.name}</p>
                    <Label htmlFor="phone" className="text-right">
                      precio estimado
                    </Label>
                    <Input id={`price${el.id}`} type="number" className="col-span-3" required value={el.price} onChange={e=>el.price = Number(e.target.value)}/>
            
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
                
                    {servicios?.map((el, index) =>
                        <SelectItem key={index} value={el.id}> <p style={{display:'flex',gap:10}}>{newServicios.some((servicio) => servicio.id === el.id)? <Check />:<X />} -  {el.name}</p></SelectItem>
                    )}
                    {servicios.length==0?"Cargando...": null}
                </SelectGroup>
            </SelectContent>
            </Select>



      <DialogFooter>
        <Button onClick={saveServices}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
