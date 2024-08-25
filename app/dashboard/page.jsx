import React from 'react'
import Header from '../Components/Header/Header'
import Link from 'next/link'
import SideBar from '../Components/sidebar/page'
import style from './dashboard.module.css'

export default function page() {
  return (
    <div className={style.dashboard_wrap}>
        <SideBar />
    </div>
  )
}
