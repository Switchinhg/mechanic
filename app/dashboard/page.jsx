import React from 'react'
import Header from '../Components/Header/Header'
import Link from 'next/link'
import SideBar from '../Components/sidebar/page'
import style from './dashboard.module.css'

export default function page() {
  return (
    <div className={style.dashboard_wrap}>
        <SideBar />
        <div className={style.dashboard}>
            
            Cuantos trabajos abiertos <br />
            cuantos trabajos sin que le hayan pagado 
            
        </div>
    </div>
  )
}
