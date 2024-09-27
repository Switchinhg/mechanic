'use client'
import React from 'react'
import Header from '../Components/Header/Header'
import Link from 'next/link'
import SideBar from '../Components/sidebar/page'
import style from './dashboard.module.css'
import { useUserContext } from '../Components/context/UserContext'
import ActiveJobsSlider from '../Components/ActiveJobsSlider/ActiveJobsSlider'

export default function page(tallerID) {

  const {user} = useUserContext()
  console.log(user)

  return (
    <div className={style.dashboard_wrap}>
      <SideBar />
      <div className={style.dashboard}>
          
          <ActiveJobsSlider tallerID={user?.uid} /> 
          Cuantos trabajos abiertos <br />
          cuantos trabajos sin que le hayan pagado 
          
      </div>
    </div>
  );
}
