import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function POST(req) {
    const jobData = await req.json();
    try{
        const collectionJobs = collection(db, "jobs");
        await addDoc(collectionJobs, jobData);
        return NextResponse.json({
            success:true,
            message: "Trabajo creado correctamente."
        })
    }catch(err){
        return NextResponse.json({
            success:false,
            message: "Error creando el trabajo."
        })
    }


    
}