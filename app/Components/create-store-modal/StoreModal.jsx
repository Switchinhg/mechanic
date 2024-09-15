'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'
import React, {  useState } from 'react'
import style from './store.module.css'
import { useUserContext } from '../context/UserContext'

export default function StoreModal({open, setOpen}) {

  const {user} = useUserContext()
  const [selectedServices, setSelectedServices] = useState([])

  const handleServiceToggle = (serviceId) => {

  }

  const services = [
    { id: 'oil-change', label: 'Oil Change' },
    { id: 'tire-rotation', label: 'Tire Rotation' },
    { id: 'brake-service', label: 'Brake Service' },
    { id: 'engine-tuneup', label: 'Engine Tune-up' },
    { id: 'car-wash', label: 'Car Wash' },
    { id: 'transmission-service', label: 'Transmission Service' },
    { id: 'wheel-alignment', label: 'Wheel Alignment' },
    { id: 'air-conditioning', label: 'A/C Service' },
    { id: 'battery-replacement', label: 'Battery Replacement' },
    { id: 'exhaust-system', label: 'Exhaust System Repair' },
    { id: 'suspension-repair', label: 'Suspension Repair' },
    { id: 'radiator-service', label: 'Radiator Service' },
    { id: 'fuel-system-cleaning', label: 'Fuel System Cleaning' },
    { id: 'timing-belt', label: 'Timing Belt Replacement' },
    { id: 'windshield-repair', label: 'Windshield Repair' },
    { id: 'paintless-dent-repair', label: 'Paintless Dent Repair' },
    { id: 'headlight-restoration', label: 'Headlight Restoration' },
    { id: 'diagnostics', label: 'Computer Diagnostics' },
    { id: 'state-inspection', label: 'State Inspection' },
    { id: 'detailing', label: 'Detailing Services' },
  ]

  const [store,setStoreName] = useState("")
  const [address,setAddress] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [services2,setServices] = useState([])




  const handleSubmit = async (e) =>{
    e.preventDefault()

    const today = Date.now();
    const jobData = {
      store,
      address,
      phone,
      email,
      created: today,
      owner:user?.email
    };

    let request = await fetch( process.env.NEXT_PUBLIC_URL + "/api/tiendas", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(jobData),
      }
      )
    let resp = await request.json()

    console.log("submit")
    console.log(resp)
    if(resp.success){
      console.log("lol")
      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {/* <Button variant="default">Open Repair Service Form</Button> */}
    </DialogTrigger>
    <DialogContent className={`w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh] ${style.modal_back} ${style.modal_test}`}>
        <DialogHeader>
          <DialogTitle>Crear nueva página de taller</DialogTitle>
          <DialogDescription>
            Ingrese los detalles de tu taller. 
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className={`grid grid-cols-4 items-center gap-4  ${style.query_style}`}>
              <Label htmlFor="name" className="text-right">
                Nombre de la tienda
              </Label>
              <Input id="name" className="col-span-3" required value={store} onChange={e=>setStoreName(e.target.value)}/>
            </div>
            <div className={`grid grid-cols-4 items-center gap-4 ${style.query_style}`}>
              <Label htmlFor="address" className="text-right">
                Dirección
              </Label>
              <Input id="address" className="col-span-3" required value={address} onChange={e=>setAddress(e.target.value)}/>
            </div>
            <div className={`grid grid-cols-4 items-center gap-4 ${style.query_style}`}>
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input id="phone" type="tel" className="col-span-3" required value={phone} onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div className={`grid grid-cols-4 items-center gap-4 ${style.query_style}`}>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" disabled value={user?.email} />
            </div>
            <div className={`grid grid-cols-4 items-start gap-4 ${style.query_style}`}>
              <Label className="text-right pt-2">Servicios</Label>
              <ScrollArea className="col-span-3 h-[100px] w-[100%] rounded border p-4">
                <div className="space-y-2">
                    Se agregan luego!
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Crear perfil</Button>
          </DialogFooter>
        </form>
      </DialogContent>
  </Dialog>
)
}
