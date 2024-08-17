'use client'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation';



export default function Header() {
  const router = useRouter();

  const [logged, setLogged] = useState(false)

  const [cart,setCart] = useState(0)

  useEffect(() => {
    
    if(localStorage.getItem("cart_qty")){
      setCart(Number(localStorage.getItem("cart_qty")))
    }
    if(localStorage.getItem("logged")){
      setLogged(true)
    }
  
  }, []
  )

const  login = () =>{
  setLogged(true)
  localStorage.setItem("logged", true)
}
const logOut = () =>{
  localStorage.removeItem("logged")
  router.push('/');
}


  return (
    <nav className={header.header}>
      <div className={header.img_lnks}>

      <div className={header.logo}>
        <Link href={"/"}>🛠️</Link>
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
      {logged?<Button variant="outline" onClick={()=>setAsAdmin()}>Set As Admin</Button>:null}
      {logged?<Button variant="outline" onClick={()=>logOut()}>Log Out</Button>:null}
        {logged?cart:null}
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
                  <Button variant="outline" onClick={()=>login()} >Enter</Button>
                  {/* <input type="submit" value="Enter" /> */}
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
