'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/sidebar/page'
import style from './trabajos.module.css'
import { Button } from '@/components/ui/button'
import TrabajosModal from '../Components/trabajosmodal/TrabajosModal'
import { useUserContext } from '../Components/context/UserContext'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Filter } from 'lucide-react'

export default function Trabajos() {
  const [actionOpen, setActionOpen] = useState() /* For actions on tag */
  const [open, setOpen] = useState(false) /* For modal of new job */
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const [modalFilter, setModalFilter] = useState(false)

  const [noData, setNoData] = useState(false)

  const [viewFinished , setViewFinished] = useState(false)

  const {user} = useUserContext()

  const setOpenModal = () =>{
    setOpen(!open)
    setModalFilter(false)
  }

  const getJobs = async () =>{
    const request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/jobs/" + user.uid)
    const resp = await request.json()
    setJobs(resp.data)
    if(resp.data.length === 0){
      setNoData(true)
    }
  }
  useEffect(() => {
    if(user?.uid){
      getJobs()
    }
  }, [user])
  
  useEffect(()=>{
    if(user?.uid){
      getJobs()
    }
  },[open])

  const formatCash = (quantity) =>{
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UYU',
    })
    return formatter.format(quantity)
  }

  const openAndCloseActions = (index) =>{
    if(actionOpen == index){
      setActionOpen()
    }else{
      setActionOpen(index)
    }
  }
  const closeModalFilter = (e) =>{
    if(!e.target.className.includes(style.trabajos_header_mobile) && !e.target.className.includes(style.trabajos_header_mobile_wrap) && !e.target.classList.contains("trabajos_btton") && e.target.querySelector('input')){
      setTimeout(() => {
        
      }, 500);
      setModalFilter(false)      
    }
  }

  const markAsClosed = async (id_doc, notify) =>{
    const request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/jobs/",{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ id_doc, notify, campo:"finished" }),
      
    })
    const resp = await request.json()
    if(resp.success){
      toast({
        title: "Trabajo archivado",
        description: resp.message,
        status: "success",
      });
      getJobs()
      setActionOpen()
    }else{
      toast({
        variant: "destructive",
        title: "Error ",
        description: resp.message,
        status: "error",
      });

    }
  }

  const checkIfEmpty = (array) =>{
    for (const el of array) {
      if(!el.finished){
        return true // true means is not empty
      }
    }
  }


  const noHayTrabajosDisponibles = () =>{
    return  (<div className={style.zero_stores}>
                <h1>No hay trabajos disponibles</h1>
                <p>Click <span onClick={setOpenModal}> Aqui </span> para agregar uno</p>
              </div>)
  }
  
  const searchByWord = (e) =>{
    setSearchTerm(e.target.value.toLowerCase())
    setActionOpen()
  }
  const limpiarFiltros = () =>{
    setSearchTerm("")
    setActionOpen()
    setViewFinished(false)
    setModalFilter(false)

  }
  const viewFinishedJobs = () =>{
    setViewFinished(!viewFinished)
    setModalFilter(false)
  }

  return (
    <div className={style.trabajos_wrap}>
        <SideBar />
        <div className={style.trabajos}>
          <div className={style.trabajos_header}>
            <div className="trabajos_btton"><Button variant="secondary"className="" onClick={setOpenModal}>Crear trabajo</Button> </div>
            <div className="trabajos_btton"><Input variant="secondary" type="text" placeholder="Buscar por palabra" value={searchTerm}  onChange={(e)=>searchByWord(e)} /></div>
            <div className="trabajos_btton"><Button variant="secondary"className={viewFinished?style.selectedButton: ""} onClick={viewFinishedJobs}>Ver trabajos finalizados</Button></div>
            <div className="trabajos_btton"><Button variant="secondary"className="" onClick={limpiarFiltros}>Limpiar filtros</Button></div>
          </div>
          <div className={style.trabajos_header_filter_icon}>
            <div className="trabajos_btton"><Button variant="secondary"className="" onClick={()=>setModalFilter(!modalFilter)}> <Filter /> <p>Filtros</p></Button> </div>
          </div>
          <div className={`${style.trabajos_header_mobile_wrap} ${modalFilter? style.trabajos_header_mobile_wrap_open:""}`} onClick={(e)=>closeModalFilter(e)}>
            <div className={`${style.trabajos_header_mobile} ${modalFilter? style.trabajos_header_mobile_wrap_open:""}`}>
              <div className="trabajos_btton">Filtros </div>
              <div className="trabajos_btton"><Button variant="secondary"className="" onClick={setOpenModal}>Crear trabajo</Button> </div>
              <div className="trabajos_btton"><Input variant="secondary" type="text" placeholder="Buscar por palabra" value={searchTerm}  onChange={(e)=>searchByWord(e)} /></div>
              <div className="trabajos_btton"><Button variant="secondary"className={viewFinished?style.selectedButton: ""} onClick={viewFinishedJobs}>Ver trabajos finalizados</Button></div>
              <div className="trabajos_btton"><Button variant="secondary"className="" onClick={limpiarFiltros}>Limpiar filtros</Button></div>
            </div>
          </div>

          <h4 className={style.current_job_title}>{viewFinished? "Viendo trabajos finalizados":"Viendo trabajos en progreso"}</h4>
          <div className={style.show_job_wrap}>
            
          {jobs.length>0? 
          jobs.filter((job) => {
            const fullName = `${job.firstName} ${job.lastName}`.toLowerCase();
            const autoDetails = `${job.maker} ${job.model} ${job.year}`.toLowerCase();
            const description = job.description.toLowerCase();

            return (
              fullName.includes(searchTerm) ||
              autoDetails.includes(searchTerm) ||
              description.includes(searchTerm) 
            );
          }).filter(job=>{
            return(
              job.finished == viewFinished
            )
          }).map((data, index) => 
            <div key={index} >


              
              <div key={index} className={style.trabajos_fix_wrap}>
                <div className={style.trabajo}>
                  <div className={style.trabajo_header}>
                    <div className={style.cliente}>
                      <h2>Cliente - {data.firstName} {data.lastName}</h2>
                      <p>Auto - {data.maker} {data.model} { data.year}</p>
                    </div>
                    <p>Ingreso <span>{data.jobCreatedATFormatted }</span></p>
                  </div>
                  <div className={style.trabajo_body}>
                    <p>Realizado</p>
                    <ul>
                      <li>{data.description}</li>
                    </ul>

                  </div>
                  <div className={style.trabajo_footer}>
                    <Button variant="outline" onClick={()=>openAndCloseActions(index)}>Acciones</Button>
                      <div className={`${style.trabajo_actions} ${actionOpen == index? style.trabajo_actions_open: null }`}>
                        <p onClick={()=>markAsClosed(data.id_doc,false)}>Marcar como terminado</p>
                        <p>Marcar como terminado y notificar cliente</p>
                        <p>Crear PDF</p>
                      </div>
                    <p>Costo estimado: UY $ {formatCash(data.estimatedCost)}</p>
                  </div>
                </div>
              </div>



          </div>
          )
 
          :
          
          !noData?
          <div className={`${style.show_job_wrap } `} >
            <Skeleton className="h-[212px] w-[600px] rounded-xl" />
            <Skeleton className="h-[212px] w-[600px] rounded-xl" />
            <Skeleton className="h-[212px] w-[600px] rounded-xl" />
          </div>
          :
            noHayTrabajosDisponibles()
          }
          {checkIfEmpty(jobs) || jobs.length == 0?
            null
            :
            viewFinished? null :noHayTrabajosDisponibles()
          }
          
              {/*  */}

              <TrabajosModal open={open} setOpen={setOpen}/>
        </div>
        </div>
    </div>
  )
}
