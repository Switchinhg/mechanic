'use client'
import React from 'react'
import { useCartContext } from '../Components/context/CartContext'
// import { useCartContext } from '../Components/context/CartContext'

export default function Cart() {
  const { cart } = useCartContext()
  // console.log(cart)
  return (
    <div>
      <h1>Carrito</h1>
      {cart.length > 0?
        cart.map((e, index)=> <div key={index}>{e}</div>)
      :
        <>Carrito vacio.</>
      }

    </div>
  )
}
