'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/sidebar/page'
import style from './trabajos.module.css'
import { Button } from '@/components/ui/button'
import TrabajosModal from '../Components/trabajosmodal/TrabajosModal'
import { useUserContext } from '../Components/context/UserContext'

export default function Trabajos() {
  const [actionOpen, setActionOpen] = useState(false) /* For actions on tag */
  const [open, setOpen] = useState(false) /* For modal of new job */
  const [jobs, setJobs] = useState([])

  const {user} = useUserContext()

  const setOpenModal = () =>{
    setOpen(!open)
  }

  useEffect(() => {
    const getJobs = async () =>{
      const request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/jobs/" + user.uid)
      const resp = await request.json()
      setJobs(resp.data)
    }
    if(user?.uid){
      getJobs()
    }
  }, [])
  
  
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
          {jobs.length>0? 
          jobs.map(data => 
            <div className={style.trabajos_fix_wrap}>
              <div className={style.trabajo}>
                <div className={style.trabajo_header}>
                  <div className={style.cliente}>
                    <h2>Cliente - {data.firstName}</h2>
                    <p>Auto - {data.maker} {data.model} { data.year}</p>
                  </div>
                  {/* <p>Ingreso <span>{data.enterDate }</span></p> */}
                </div>
                <div className={style.trabajo_body}>
                  <p>Realizado</p>
                  <ul>
                    <li>{data.description}</li>
                  </ul>

                </div>
                <div className={style.trabajo_footer}>
                  <Button variant="outline" onClick={()=>setActionOpen(!actionOpen)}>Acciones</Button>
                    <div className={`${style.trabajo_actions} ${actionOpen? style.trabajo_actions_open: null }`}>
                      <p>Terminado</p>
                      <p>Marcar como terminado y notificar cliente</p>
                      <p>Crear PDF</p>
                    </div>
                  <p>Costo estimado: UY $ {data.estimatedCost}</p>
                </div>
              </div>
            </div>
          )

          :
          <p>Loading...</p>
          }
          
              {/*  */}

              <TrabajosModal open={open} setOpen={setOpen}/>
        </div>
    </div>
  )
}
