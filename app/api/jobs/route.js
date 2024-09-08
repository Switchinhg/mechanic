import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
export async function PATCH(req){
    const {id_doc , notify, campo} = await req.json()
    try{
        const jobDocRef = doc(db, "jobs", id_doc); 
        switch(campo){
            case "finished" :
                await updateDoc(jobDocRef, {
                    finished: true,
                    completedAt: new Date() 
                });
            break
        }
        return NextResponse.json({
            success: true,
            message: "Trabajo Archivado correctamente."
        })

    }catch(err){
        console.log(err)

        return NextResponse.json({
            success: false,
            message: "Error archivando trabajo."
        })
    }
}