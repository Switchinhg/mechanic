import React from 'react'
import styles from './itemlist.module.css'

export default function ItemList({items}) {
  return (
    <div className={styles.product_wrap}>
        {items.map((e,index)=><div key={index}><a href={"/product/"+e.id}>{e.product_name} {index}</a></div>)}
    </div>
  )
}
