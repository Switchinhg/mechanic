'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { AlignHorizontalDistributeCenter, BatteryCharging, Brush, Car, Check, CheckSquare, Clock, Cpu, Disc, DollarSign, Facebook, FacebookIcon, Fuel, Hammer, Instagram, Linkedin, Mail, MapPin, MonitorSmartphone, Package, Phone, Star, Thermometer, Truck, Twitter, Wrench, X, Zap } from "lucide-react"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


  import socialStyle from './social.module.css'
  import { toast } from "@/components/ui/use-toast"

export default function ModalAddSocial({open, setOpen,name,socials, email}) {
    const [socialDB, setSocialDB] = useState([])
    const [social, setSocial] = useState()

    const addNewSocial = async (e) =>{
        let request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/socials/"+ email,{
            method:"GET",
        })
        let socials = await request.json()
        setSocialDB(socials)
        
    }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {/* <Button variant="outline">Edit Profile</Button> */}
    </DialogTrigger>
    <DialogContent className={`${socialStyle.bg} sm:max-w-[700px] `} >
      <DialogHeader>
        <DialogTitle>Agregar Link de {socials}.</DialogTitle>
        <DialogDescription>
         
          <div style={{paddingTop:10,paddingBottom:10}} className={socialStyle.mapPricesWrap}>
      
          </div>
        </DialogDescription>
      </DialogHeader>
        
            <div>
                <Label htmlFor="accountLink">Account Link</Label>
                <Input id="accountLink" type="Text" className="col-span-3" placeholder={`Ej: https://mstaller.com/store/${name}`} required value={social} onChange={e=>setSocial(e.target.value)} />
            </div>


      <DialogFooter>
        <Button onClick={addNewSocial}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
