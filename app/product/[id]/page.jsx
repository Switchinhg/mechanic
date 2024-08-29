'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { useCartContext } from '@/app/Components/context/CartContext';



export default function page({params}) {
  const router = useRouter()
  const [prod, setProd] = useState(null)

  const { toast } = useToast()
  const {addToCart} = useCartContext()

  // console.log(product)
  useEffect(() => {
    const fetProduct = async () =>{
      let request = await fetch("http://localhost:3000/api/productos/"+ params.id)
      let product = await request.json()
      setProd(product)
    }
    fetProduct()
  }, [params.id])
  
  if (!prod) {
    return <div></div>;
  }

  return (
    <>
    <div>estas viendo {prod.product_name} - U$S {prod.price} - {prod.description}</div>
    <Button variant="outline" onClick={()=>addToCart(params.id)}>Add to cart</Button>
    <Button variant="outline" onClick={()=>router.back()}>volver Atrás</Button>
    
    </>
  )
}
