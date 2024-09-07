import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";



export async function GET(req, {params}) {
    try{
        const q =  query(collection(db, "jobs"), where("tallerID", "==", params.id))
        const querySapshot = await getDocs(q)
        
        const docs = querySapshot.docs.map(doc => ({
            id_doc: doc.id,    
            ...doc.data()  
        }));
        const newDocSorted =  docs.sort((a, b) => b.jobsCreated - a.jobsCreated);
        
        function formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0'); 
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          }
        newDocSorted.forEach(item => {
            item.jobCreatedATFormatted = formatDate(item.jobsCreated);
          });

        return NextResponse.json({
            success:true,
            data:newDocSorted
        })
    }catch(err){
        return NextResponse.json({
            success:false,
            message: "Error obteniendo Trabajos"
        })
    }


    
}