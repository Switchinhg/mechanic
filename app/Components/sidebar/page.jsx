import React from 'react'
import style from './sidebar.module.css'
import Link from 'next/link'
import { Briefcase, CircleGauge, Wrench } from 'lucide-react'

export default function SideBar() {
  return (
    <div className={style.sidebar}>
            {/* <div className={style.sidebar_header}> */}
                {/* <div>Header</div> */}
                {/* <div>X</div> */}
            {/* </div> */}
            <div className={style.sidebar_body}>
                <Link className={style.sidebar_link} href="/dashboard"> <CircleGauge /> <p>Detalles</p></Link>
                <Link className={style.sidebar_link} href="/trabajos"> <Briefcase /> <p>Trabajos</p></Link>
                <Link className={style.sidebar_link} href="/settings"> <Wrench /> <p>Configuración</p></Link>
                {/* <div>X</div> */}
            </div>

            <div className={style.versioning}>
              V <span>{process.env.NEXT_PUBLIC_VERSION}</span>
            </div>
    </div>
  )
}
