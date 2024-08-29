import React from 'react'
import style from './sidebar.module.css'
import Link from 'next/link'

export default function SideBar() {
  return (
    <div className={style.sidebar}>
            {/* <div className={style.sidebar_header}> */}
                {/* <div>Header</div> */}
                {/* <div>X</div> */}
            {/* </div> */}
            <div className={style.sidebar_body}>
                <Link className={style.sidebar_link} href="/dashboard">Detalles</Link>
                <Link className={style.sidebar_link} href="/trabajos">Trabajos</Link>
                <Link className={style.sidebar_link} href="/settings">Configuración</Link>
                {/* <div>X</div> */}
            </div>
    </div>
  )
}
