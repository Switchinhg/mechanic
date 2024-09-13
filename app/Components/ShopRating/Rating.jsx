import React from 'react'

export default function Rating({sales, reviews, responseTimeAvg, createdAt}) {
    console.log(sales, reviews, responseTimeAvg, createdAt)

    /* sales -> Number of Sales */
    /* reviews -> Number of reviews */
    /* responseTimeAvg-> Average response time */
    /* createdAt -> timestamp of date of creation of car */

    if(sales<5){
        return <div>?</div>
    }
  return (
    <div>10/10</div>
  )
}
