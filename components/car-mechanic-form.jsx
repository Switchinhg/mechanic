'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function CarMechanicForm() {
  return (
    (<Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Car Repair Service Form</CardTitle>
        <CardDescription>Please fill out the details for your car repair service.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(123) 456-7890" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input id="make" placeholder="Toyota" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="Camry" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" placeholder="2022" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input id="mileage" type="number" placeholder="50000" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
            <Input id="vin" placeholder="1HGBH41JXMN109186" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Repair Information</h3>
          <div className="space-y-2">
            <Label htmlFor="serviceType">Type of Service</Label>
            <Select>
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Regular Maintenance</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="diagnostic">Diagnostic</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description of Issue</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue or service needed" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
            <Input id="estimatedCost" type="number" placeholder="0.00" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="flex items-center space-x-2">
            <Switch id="urgentRepair" />
            <Label htmlFor="urgentRepair">Urgent Repair</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Service Date</Label>
            <Input id="preferredDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional information or special requests" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Repair Request</Button>
      </CardFooter>
    </Card>)
  );
}