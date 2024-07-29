'use client'
import React, { useState } from 'react'
import header from './Header.module.css'
import {ModeToggle} from '../theme/ModeToggle'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [logged, setLogged] = useState(true)
  return (
    <nav className={header.header}>
      <div className={header.logo}>
        🛠️
      </div>
      <div className={header.buttons}>
        <ModeToggle />

      {
        logged?
        <Dialog>
          <DialogTrigger ariant="outline">
          <Button variant="outline">
            Log In
          </Button>

          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log in</DialogTitle>
              <DialogDescription>
                <form action="" className={header.form}>
                  <div className={header.username_or_email}>
                    <label htmlFor="user_or_email">Username Or Email</label>
                    <input type="text" name="user_or_email" id="user_or_email" />
                  </div>
                  <div className={header.password}>
                    <label htmlFor="password">Pasword</label>
                    <input type="password" name="password" id="password" />
                  </div>
                </form>
              </DialogDescription>
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
