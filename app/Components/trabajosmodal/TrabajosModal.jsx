'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import  style  from './jobs.module.css'
import { useState } from "react"
import { useUserContext } from "../context/UserContext"
import { toast } from "@/components/ui/use-toast"
 
export default function TrabajosModal({open,setOpen}) {

  const {user} = useUserContext()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [urgentRepair, setUrgentRepair] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const createJob = async () =>{
    const today = Date.now();
    const jobData = {
      firstName,
      lastName,
      email,
      phone,
      maker,
      model,
      year,
      serviceType,
      description,
      estimatedCost,
      urgentRepair,
      preferredDate,
      additionalNotes,
      tallerID:user.uid,
      finished:false,
      paid:false,
      started_working:false,
      jobsCreated: today
    };

    if(!firstName || !lastName || !email || !phone || !maker || !model || !serviceType || !description ){
      toast({
        variant: "destructive",
        title: "Error - Algunos datos son necesarios",
        status: "error",
      });
    }else{
      let request = await fetch( process.env.NEXT_PUBLIC_URL + "/api/jobs", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(jobData),
        }
        )
      let resp = await request.json()
  
      if(resp.success){
        toast({
          title: "Trabajo creado",
          description: resp.message,
          status: "success",
        });
        setOpen(false)
      }else{
        toast({
          title: "Error al crear trabajo",
          description: resp.message,
          status: "error",
        });
        setOpen(false)
      }
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {/* <Button variant="default">Open Repair Service Form</Button> */}
    </DialogTrigger>
    <DialogContent className={`w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh] ${style.modal_back} ${style.modal_test} `}>
      <ScrollArea className="max-h-[calc(90vh-4rem)] sm:max-h-[calc(80vh-4rem)] overflow-y-auto pr-4">
        <DialogHeader>
          <DialogTitle>Agregar nuevo trabajo</DialogTitle>
          <DialogDescription>Por favor llená este formulario sobre el servicio al vehiculo.</DialogDescription>
        </DialogHeader>
        <Card className="w-full border-0 shadow-none">
          <CardContent className={`space-y-6 pt-4 ${style.modal_back}`}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información del cliente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre <span className="error_color">*</span></Label>
                  <Input id="firstName" placeholder="Santiago" value={firstName} onChange={(e) =>setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido <span className="error_color">*</span></Label>
                  <Input id="lastName" placeholder="Font" value={lastName} onChange={(e) =>setLastName(e.target.value)}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="error_color">*</span></Label>
                <Input id="email" type="email" placeholder="alguien@correo.com" value={email} onChange={(e) =>setEmail(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono <span className="error_color">*</span></Label>
                <Input id="phone" type="tel" placeholder="095 637 215" value={phone} onChange={(e) =>setPhone(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles del vehículo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Marca <span className="error_color">*</span></Label>
                  <Input id="make" placeholder="Toyota" value={maker} onChange={(e) =>setMaker(e.target.value)}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo <span className="error_color">*</span></Label>
                  <Input id="model" placeholder="Camry" value={model} onChange={(e) =>setModel(e.target.value)}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input id="year" type="number" placeholder="2022" value={year} onChange={(e) =>setYear(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de la reparación</h3>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo del servicio <span className="error_color">*</span></Label>
                <Select onValueChange={(value) => setServiceType(value)}>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Seleccionar tipo de servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Mantenimiento regular</SelectItem>
                    <SelectItem value="repair">Reparación</SelectItem>
                    <SelectItem value="diagnostic">Diagnostico</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción del problema <span className="error_color">*</span></Label>
                <Textarea id="description" placeholder="Por favor describir el problema del vehiculo" value={description} onChange={(e) =>setDescription(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Costo estimado ($)</Label>
                <Input id="estimatedCost" type="number" placeholder="0.00" value={estimatedCost} onChange={(e) =>setEstimatedCost(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles del trabajo</h3>
              <div className="flex items-center space-x-2">
                <Switch id="urgentRepair" className={style.button_switch} value={urgentRepair}  onCheckedChange={setUrgentRepair}/>
                <Label htmlFor="urgentRepair">Es urgente?</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Posible fecha de entrega</Label>
                <Input id="preferredDate" type="date" value={preferredDate} onChange={(e) =>setPreferredDate(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Notas adiccionales</Label>
                <Textarea id="additionalNotes" placeholder="Alguna otra información?" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)}/>
              </div>
            </div>
          </CardContent>
          <CardFooter className={style.modal_back}>
            <Button className="w-full" onClick={() => createJob()}>Crear nuevo trabajo</Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </DialogContent>
  </Dialog>
  )
}