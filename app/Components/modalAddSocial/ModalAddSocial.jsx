'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { AlignHorizontalDistributeCenter, BatteryCharging, Brush, Car, Check, CheckSquare, Clock, Cpu, Disc, DollarSign, Facebook, FacebookIcon, Fuel, Hammer, Instagram, Linkedin, Mail, MapPin, MonitorSmartphone, Package, Phone, Star, Thermometer, Truck, Twitter, Wrench, X, Zap } from "lucide-react"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


  import socialStyle from './social.module.css'
  import { toast } from "@/components/ui/use-toast"
import { Toast } from '@/components/ui/toast'

export default function ModalAddSocial({open, setOpen,name,socials, email}) {
    const [socialDB, setSocialDB] = useState([])
    const [social, setSocial] = useState()

    const getAllSocials = async (e) =>{
        let request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/socials/"+ email)
        let response = await request.json()
        console.log(response)
        if(response.success){
          response?.socials? setSocialDB(response?.data[0].socials) : null
        }else{
          Toast({
            title: "Error",
            description: socials.message,
            varian: "destructive",
          });
        }
        console.log(socials)
        console.log(socialDB)
    }
    const addNewSocial = async () =>{
      let socialData = {
        name:socials,
        link:social.link
      }

      console.log(socialData)
      console.log(socials)

      
      if(socialDB.length > 0 && socialDB.some(e=>e.name == socials)){

        console.log("ya tiene en el db la social")
        // let removeSocial = socialDB.filter(e=>e.name != socials)
        // setSocialDB(removeSocial)
      }else{
        if(socialDB.length > 0){
          setSocialDB([...socialDB, socialData])
        }else{
          setSocialDB([socialData])
        }
      }
      console.log(socialDB)
      // let request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/socials/",{
      //   method:"PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //     body: JSON.stringify({owner:email,data:social}),
      // })
      // let response = await request.json()
      // console.log(response)
    }

    useEffect(() => {
      getAllSocials()
    }, [])
    useEffect(() => {
      console.log(socialDB)
    }, [socialDB])


    const setSocialLink = (e) =>{
      setSocial({name:socials,link:e.target.value})
      console.log(e.target.value)
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
                <Input id="accountLink" type="Text" className="col-span-3" placeholder={`Ej: https://mstaller.com/store/${name}`} required value={social?.link} onChange={e=>setSocialLink(e)} />
            </div>


      <DialogFooter>
        <Button onClick={()=>addNewSocial()}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
