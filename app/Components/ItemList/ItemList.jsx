import React from 'react'
import styles from './itemlist.module.css'
import Link from 'next/link'

export default function ItemList({items}) {
  return (
    <div className={styles.product_wrap}>
        {items.map((e,index)=><div key={index}><Link href={"/product/"+e.id}>{e.product_name} {index}</Link></div>)}
    </div>
  )
}
