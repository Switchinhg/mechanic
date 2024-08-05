'use client'
import React, { useState } from 'react'
import header from './Header.module.css'
import {ModeToggle} from '../theme/ModeToggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from 'next/link'



export default function Header() {
  const [logged, setLogged] = useState(false)
  return (
    <nav className={header.header}>
      <div className={header.img_lnks}>

      <div className={header.logo}>
        🛠️
      </div>
    {
      logged?
        <ul className={header.links}>
          <li><Link href={"/dashboard"}>Dashboard</Link></li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><li className="unavailable">Create Store</li></TooltipTrigger>
              <TooltipContent>
                <p>Under Development</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <li><Link href={"/catalogo"}>Catalogo</Link></li>
          
        </ul>
      : null
    }

      </div>
      <div className={header.buttons}>
        <ModeToggle />

      {
        !logged?
        <Dialog>
          <DialogTrigger>
          {/* <Button variant="outline"> */}
            Log In
          {/* </Button> */}

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log in</DialogTitle>
              {/* <DialogDescription> */}
                <form action="" className={header.form}>
                  <div className={header.username_or_email}>
                    <label htmlFor="user_or_email">Username Or Email</label>
                    <input type="text" name="user_or_email" id="user_or_email" />
                  </div>
                  <div className={header.password}>
                    <label htmlFor="password">Pasword</label>
                    <input type="password" name="password" id="password" />
                  </div>
                  <input type="submit" value="Enter" onClick={()=>setLogged(!logged)}/>
                </form>
              {/* </DialogDescription> */}
            </DialogHeader>
          </DialogContent>
        </Dialog>
        :
        <>Logged</>
      }
        
      </div>
    </nav>
  )
}
