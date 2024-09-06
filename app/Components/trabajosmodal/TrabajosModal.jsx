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
 
export default function TrabajosModal({open,setOpen}) {


  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {/* <Button variant="default">Open Repair Service Form</Button> */}
    </DialogTrigger>
    <DialogContent className={`w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh]  ${style.modal_back} `}>
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
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" placeholder="Santiago" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" placeholder="Font" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="alguien@correo.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono</Label>
                <Input id="phone" type="tel" placeholder="095 637 215" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles del vehículo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Marca</Label>
                  <Input id="make" placeholder="Toyota" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input id="model" placeholder="Camry" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input id="year" type="number" placeholder="2022" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de la reparación</h3>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo del servicio</Label>
                <Select>
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
                <Label htmlFor="description">Descripción del problema</Label>
                <Textarea id="description" placeholder="Por favor describir el problema del vehiculo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Costo estimado ($)</Label>
                <Input id="estimatedCost" type="number" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles del trabajo</h3>
              <div className="flex items-center space-x-2">
                <Switch id="urgentRepair" className={style.button_switch}/>
                <Label htmlFor="urgentRepair">Es urgente?</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Posible fecha de entrega</Label>
                <Input id="preferredDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Notas adiccionales</Label>
                <Textarea id="additionalNotes" placeholder="Alguna otra información?" />
              </div>
            </div>
          </CardContent>
          <CardFooter className={style.modal_back}>
            <Button className="w-full" onClick={() => setOpen(false)}>Crear nuevo trabajo</Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </DialogContent>
  </Dialog>
  )
}