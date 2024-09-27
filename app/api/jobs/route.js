import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function GET(req) {
    const { searchParams } = req.nextUrl;  
    const tallerID  = searchParams.get('tallerID '); 

    const jobsCall = collection(db, "jobs")

    /* If searching for a acategory, we use query */
    const q =  query(jobsCall, where("tallerID", "==" , tallerID )/* , where("finished", "==", false) */)

    /* Get the docs */
    const querySapshot = await getDocs(q)

    /* Get the actual data */
    // const docs = querySapshot.docs.map(doc => doc.data())

    /* Get the actual data with the ID */
    const docs = querySapshot.docs.map(doc => ({
        id: doc.id,    // Get the document ID
        ...doc.data()  // Spread the rest of the document data
    }));
    console.log(docs)
    /* return the array */
    return NextResponse.json(docs)
}
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