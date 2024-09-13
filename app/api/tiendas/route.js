import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

/* Create a new Store */
export async function POST(request) {

    const StoreData = await request.json();
    try{
        console.log(StoreData)
        const collectionJobs = collection(db, "stores");
        await addDoc(collectionJobs, StoreData);
        return NextResponse.json({
            success:true,
            message: "Tienda creada correctamente."
        })
    }catch(err){
        console.log(StoreData)
        return NextResponse.json({
            success:false,
            message: "Error creando la tienda."
        })
    }
}