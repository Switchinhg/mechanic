import Link from 'next/link'
import React from 'react'
import ItemList from '../Components/ItemList/ItemList'
import styles from './catalogo.module.css'

export default function page() {

  let items = [
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"},
    {"product_name":"Iphone 15 pro Max", "price":2000,"description":"Latest Gen Iphone"}
  ]
  return (
    <>
      <h1>View Products</h1>

      <div>
        <ItemList items={items} />
      </div>
    </>
  )
}
