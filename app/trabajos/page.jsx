'use client'
import React, { useState } from 'react'
import SideBar from '../Components/sidebar/page'
import style from './trabajos.module.css'
import { Button } from '@/components/ui/button'
import TrabajosModal from '../Components/trabajosmodal/TrabajosModal'
export default function Trabajos() {
  const [actionOpen, setActionOpen] = useState(false) /* For actions on tag */
  const [open, setOpen] = useState(false) /* For modal of new job */

  const setOpenModal = () =>{
    setOpen(!open)
  }
  
  return (
    <div className={style.trabajos_wrap}>
        <SideBar />
        <div className={style.trabajos}>
          <div className={style.trabajos_header}>
            <div className="trabajos_btton"><Button variant="secondary"className="" onClick={setOpenModal}>Crear trabajo</Button> </div>
            <div className="trabajos_btton"><Button variant="secondary"className="">Buscar</Button></div>
            {/* <div className="trabajos_btton">Agregar trabajo</div>
            <div className="trabajos_btton">Agregar trabajo</div> */}
          </div>
          
              <div className={style.trabajos_fix_wrap}>
                <div className={style.trabajo}>
                  <div className={style.trabajo_header}>
                    <div className={style.cliente}>
                      <h2>Cliente - Santiago Font</h2>
                      <p>Auto - Corolla 2002</p>
                    </div>
                    <p>Ingreso <span>1/9/2024</span></p>
                  </div>
                  <div className={style.trabajo_body}>
                    <p>Realizado</p>
                    <ul>
                      <li>Cambiar Radiador</li>
                      <li>Arreglar Aboyaduras</li>
                      <li>Cambiar Rueda Izquierda</li>
                    </ul>

                  </div>
                  <div className={style.trabajo_footer}>
                    <Button variant="outline" onClick={()=>setActionOpen(!actionOpen)}>Acciones</Button>
                      <div className={`${style.trabajo_actions} ${actionOpen? style.trabajo_actions_open: null }`}>
                        {/* `${header.cart_wrap} ${showMenu ? header.cart_wrap_show_cart : header.cart_wrap_no_show_cart}` */}
                        <p>Archivar</p>
                        <p>Archivar y notificar cliente</p>
                        <p>Crear PDF</p>
                      </div>
                    <p>Costo total: UY $ 2.200</p>
                    {/* <div className={style.footer_tags}>
                      <p>TAGS:</p>
                      <span>Radiador</span>
                      <span>Aboyadura</span>
                      <span>Rueda</span>
                    </div> */}
                  </div>
              </div>
              </div>

              <TrabajosModal open={open} setOpen={setOpen}/>
        </div>
    </div>
  )
}
