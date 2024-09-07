import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";



export async function GET(req, {params}) {

    try{
        
        const q =  query(collection(db, "jobs"), where("tallerID", "==", params.id))
        const querySapshot = await getDocs(q)
        
        const docs = querySapshot.docs.map(doc => ({
            id: doc.id,    
            ...doc.data()  
        }));

        return NextResponse.json({
            success:true,
            data:docs
        })
    }catch(err){
        console.log(err)
        return NextResponse.json({
            success:false,
            message: "Error obteniendo Trabajos"
        })
    }


    
}