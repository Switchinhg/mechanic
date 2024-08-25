import React from 'react'
import SideBar from '../Components/sidebar/page'
import style from './trabajos.module.css'
export default function Trabajos() {
  return (
    <div className={style.trabajos_wrap}>
        <SideBar />
        <div className={style.trabajos}>
          <div className={style.trabajos_header}>
            <div className="trabajos_btton">Agregar trabajo</div>
            <div className="trabajos_btton">Buscar</div>
            {/* <div className="trabajos_btton">Agregar trabajo</div>
            <div className="trabajos_btton">Agregar trabajo</div> */}
          </div>
        </div>
    </div>
  )
}
