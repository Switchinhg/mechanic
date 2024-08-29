import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function GET(request, {params}) {

    //todo secure endpoint 
    /* Get the collection product (all products) */

    console.log("aca")
    /* If searching for a acategory, we use query */
    const q = query(collection(db, "users"), where("Email", "==", params.email));
    console.log(params.email)
    // const q =  query(tiendasCall.where("Email", "==" , params.uid))


    console.log("aca")
    /* Get the docs */
    const querySapshot = await getDocs(q)
    console.log("aca")
    
    /* Get the actual data */
    // const docs = querySapshot.docs.map(doc => doc.data())
    
    /* Get the actual data with the ID */
    const docs = querySapshot.docs.map(doc => (doc.data()  ));
    console.log(docs)




    /* return the array */
    return NextResponse.json(docs)
    // return NextResponse.json({false:true})
}