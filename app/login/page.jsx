'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import style  from './login.module.css'
import { useUserContext } from '../Components/context/UserContext'


export default function Login() {
    /* True = Login , False = register */
    const [action, setAction] = useState(true)
    const [error, setError] = useState("")
    const {register, login}= useUserContext()

    const handleIdentification = (e) =>{
        e.preventDefault()

        if(action){
            fetchLogin(e.target[0].value, e.target[1].value)
        }else{
            if(e.target[1].value == e.target[2].value ){
                if(e.target[1].value.length > 6){
                    fetchRegister(e.target[0].value, e.target[1].value)

                }else{
                    setError("La contraseña debe ser mayor a 6 caracteres")
                }
            }else{
                setError("Las contraseñas deben ser iguales")
            }
        }
    }

    const fetchLogin = async (email, password) =>{
        const resp = await login(email, password)
        if(!resp){
            return
        }
        if(!resp.success){
            console.log(resp)
            setError(resp.message)
        }
    }   
    const  fetchRegister = async (email, password) =>{
        const resp = await register(email, password)
        if(!resp){
            return
        }
        if(!resp.success){
            setError(resp.message)
        }
    }
  return (
    <div className={style.id_wrapper}>
        <h1>{action?"Entrar":"Registro"}</h1>
        <div className={style.form}>
            <form onSubmit={handleIdentification} >
                {action?
                <>
                <div>
                    <label htmlFor="login_email">Email</label>
                    <input type="email" name="login_email" id="login_email" />
                </div>
                <div >
                    <label htmlFor="login_password">Contraseña</label>
                    <input type="password" name="login_password" id="login_password" />
                </div>
                <div style={{color:"rgba(217, 60, 60, 0.67)"}}>{error}</div>
                </>
                :
                <>
                <div>
                    <label htmlFor="register_email">Email</label>
                    <input type="email" name="register_email" id="register_email" />
                </div>
                <div>
                    <label htmlFor="register_password">Contraseña</label>
                    <input type="password" name="register_password" id="register_password" />
                </div>
                <div >
                    <label htmlFor="register_repeat_password">Repetir contraseña</label>
                    <input type="password" name="register_repeat_password" id="register_repeat_password" />
                </div>
                <div style={{color:"rgba(217, 60, 60, 0.67)"}}>{error}</div>
                </>
                }
                <Button variant="outline" type="submit">{action?"Entrar":"Registrarse"}</Button>
                {/* <input type="submit" value="Enter" /> */}
            </form>
                <Button variant="outline" onClick={()=>{setAction(!action); setError("")}} >{action?"¿No tenés cuenta? Registrate.":"¿Tenés cuenta? Entrar "}</Button>
        </div>
    </div>
  )
}
