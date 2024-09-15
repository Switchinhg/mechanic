import { Star } from 'lucide-react'
import React from 'react'

export default function Rating({reviews, createdAt}) {
    console.log( reviews, createdAt)


    // if(){

    // }

    /* sales -> Number of Sales */
    /* reviews -> Number of reviews */
    /* responseTimeAvg-> Average response time */
    /* createdAt -> timestamp of date of creation of car */

    if(!reviews){
        return <div style={{display:"flex",gap:10}} > <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" /> No tiene suficientes reseñas {/* <p>(0 reseñas)</p> */}</div>
    }
  return (
    <div><Star /> <p>(256 Reseñas)</p> </div>
  )
}
