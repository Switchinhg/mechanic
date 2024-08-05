import React from 'react'
import styles from './itemlist.module.css'

export default function ItemList({items}) {
  return (
    <div className={styles.product_wrap}>
        {items.map((e,index)=><div key={index}>{e.product_name} {index}</div>)}
    </div>
  )
}
