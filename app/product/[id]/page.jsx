'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"


export default function page({params}) {
  const router = useRouter()
  const [prod, setProd] = useState(null)

  const { toast } = useToast()

  // console.log(product)
  useEffect(() => {
    const fetProduct = async () =>{
      let request = await fetch("http://localhost:3000/api/productos/"+ params.id)
      console.log(request)
      let product = await request.json()
      console.log("xD'")
      setProd(product)
      console.log(prod)
    }
    fetProduct()
  }, [params.id])
  
  
  // let items = [
  //   {"id":1,"product_name":"Iphone 15 Pro Max","price":2000,"description":"Latest Gen Iphone"},
  //   {"id":2,"product_name":"Samsung Galaxy S23 Ultra","price":1800,"description":"High-end Android phone"},
  //   {"id":3,"product_name":"MacBook Pro 14-inch","price":2500,"description":"Powerful laptop from Apple"},
  //   {"id":4,"product_name":"Sony WH-1000XM5","price":400,"description":"Noise-cancelling headphones"},
  //   {"id":5,"product_name":"Nintendo Switch OLED","price":350,"description":"Popular handheld console"},
  //   {"id":6,"product_name":"Dell XPS 13","price":1500,"description":"Compact and powerful laptop"},
  //   {"id":7,"product_name":"Apple Watch Series 8","price":500,"description":"Advanced smartwatch from Apple"},
  //   {"id":8,"product_name":"Google Pixel 7 Pro","price":900,"description":"Google's latest smartphone"},
  //   {"id":9,"product_name":"Sony PlayStation 5","price":500,"description":"Next-gen gaming console"},
  //   {"id":10,"product_name":"Bose QuietComfort Earbuds","price":300,"description":"Premium wireless earbuds"},
  //   {"id":11,"product_name":"Canon EOS R5","price":3900,"description":"High-resolution full-frame camera"},
  // ];

  // const addToCart = ( id) =>{
  //     toast({
  //       title: "Product added to cart",
  //       description: items[id].product_name + " succesfully added to cart.",
  //     })
  // }
  
  if (!prod) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <div>estas viendo {prod.product_name} - U$S {prod.price} - {prod.description}</div>
    <Button variant="outline" onClick={()=>addToCart(params.id-1)}>Add to cart</Button>
    <Button variant="outline" onClick={()=>router.back()}>volver Atrás</Button>
    
    </>
  )
}
