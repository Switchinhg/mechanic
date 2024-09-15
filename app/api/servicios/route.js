import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function POST(req) {
    const serviceData = await req.json();
    console.log("hola")
    console.log(serviceData)
    try{
        const collectionJobs = collection(db, "services");
        await addDoc(collectionJobs, serviceData);
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

export async function GET(request) {
    //todo secure endpoint 
    console.log("hola")
    /* Get the collection product (all products) */
    
    const servicesCall = query(collection(db, "services"))
    const docSnap = await getDocs(servicesCall)
    console.log(docSnap)

    const docs = docSnap.docs.map(doc => ({
        id: doc.id,    // Get the document ID
        ...doc.data()  // Spread the rest of the document data
    }));

    console.log(docs)
    if(docSnap.empty){
        return NextResponse.json({
        //no tiene stores
            success:false,
            message: "No hay servicios"
        })
    }else{
        //tiene stores
        return NextResponse.json({
            success:true,
            data:docs,
        })
    }

}

export async function POST(req) {
    const jobData = await req.json();

    console.log(jobData)
    try{
        const docRef = doc(db, "stores");

    //     // Create a query to find the document with the specific owner
    //     const q = query(colRef, where("owner", "==", ""));

    //     // Get the documents matching the query
    //     const querySnapshot = await getDocs(q);

    // // Check if the document exists
    //     if (!querySnapshot.empty) {
    //         querySnapshot.forEach(async (doc) => {
    //         // Get document reference by ID
    //         const docRef = doc.ref;
    
    //         // Update the array in the document
    //         await updateDoc(docRef, {
    //             yourArrayField: arrayUnion(newItem),
    //         });
    
    //         console.log(`Document ${doc.id} successfully updated!`);
    //         });
    //     }

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