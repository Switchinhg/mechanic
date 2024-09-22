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
import { useUserContext } from '../context/UserContext'
import { usePathname } from 'next/navigation'
import { useCartContext } from '../context/CartContext'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'




export default function Header() {
  // const router = useRouter();
  // router.push('/');
  const path = usePathname()

  const {logged, logout }= useUserContext()
  const { cart } = useCartContext()
  const [showMenu, setShowMenu] = useState(false)

  const showCart = () =>{
    setShowMenu(true)
  }
  const hideCart = () =>{
    setShowMenu(false)
  }
  
  

  return (
    <nav className={header.header}>
      <div className={header.img_lnks}>

      <div className={header.logo}>
        <Link href={"/"}> <Image src="/blanco.png" width={200} height={50} className="hidden dark:block" /> </Link>
        <Link href={"/"}> <Image src="/negro.png" width={200} height={50} className="block dark:hidden" /> </Link>
      </div>
    {
      logged?
        <ul className={header.links}>
          <li className={path == "/dashboard"? "link_active":""}><Link href={"/dashboard"}>Panel</Link></li>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <li className={path == "/store"? "link_active unavailable":"unavailable"}><Link href={"/store"}>Perfil de taller</Link></li></TooltipTrigger>
              <TooltipContent>
                <p>En desarrollo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          {/* <li><Link href={"/catalogo"} className={path == "/catalogo"? "link_active" :""}>Catalogo (testeo)</Link></li> */}
          
        </ul>
      : 
      <div style={{display:'flex', gap:10}}>
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-[70px]" />
      </div>
    }

      </div>
      <div className={header.buttons}>
      {/* {logged?<Button variant="outline" onClick={()=>setAsAdmin()}>Set As Admin</Button>:null} */}
        {logged?
        <>
        <p className={header.cart_qty_p} onMouseOver={()=>showCart()} onMouseLeave={()=>hideCart()}>{cart.length}</p>
        <div className={header.test}>
          {Number(cart.length) > 0?
          <div onMouseOver={()=>showCart()} onMouseLeave={()=>hideCart()} className={`${header.cart_wrap} ${showMenu ? header.cart_wrap_show_cart : header.cart_wrap_no_show_cart}`}>
            {cart.map((e, index)=><div key={index}>{e}</div> + " ")}

              <Button className={header.btn_goto_cart_wrap} variant="outline"> <Link href={"/cart"}>Go to cart</Link> </Button>
          </div>
          
          :

          <div onMouseOver={()=>showCart()} onMouseLeave={()=>hideCart()} className={`${header.cart_wrap} ${header.text_align} ${showMenu ? header.cart_wrap_show_cart : header.cart_wrap_no_show_cart}`}>
            El carrito esta vacio!
          </div>
          }
        </div>
        </>
        :
        null}
        <ModeToggle />

      {
        !logged?
          <Button>
            <Link href="/login" className='p-2'>
              Entrar a msTaller
            </Link>
          </Button>
        :
        <>{logged?<Button variant="outline" onClick={()=>logout()}>Log Out</Button>:null}</>
      }
        
      </div>
    </nav>
  )
}
