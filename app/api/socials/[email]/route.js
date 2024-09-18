import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";


export async function GET(request, {params}) {
    const email = params.email
    
    const qStores = query(collection(db, "stores"), where("owner", "==", email));
    console.log("hola")
    console.log("hola")
    const qStoreSnapshot = await getDocs(qStores)
    
    const docs = qStoreSnapshot.docs.map(doc => ({
        id: doc.id,    // Get the document ID
        ...doc.data()  // Spread the rest of the document data
    }));
    
    if(!qStoreSnapshot.empty){
        return NextResponse.json({
        //no tiene stores
            success:true,
            data:docs,
        })
    }else{
        //tiene stores
        return NextResponse.json({
            success:false,
            message: "Error obteniendo redes sociales."
        })
    }
}
