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

export async function GET(request, {params}) {
    const email = params.email
    
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySapshot = await getDocs(q)
 
    if (!querySapshot.empty){
        const doc = querySapshot.docs[0].data()
        const qStores = query(collection(db, "stores"), where("owner", "==", email));
        const qStoreSnapshot = await getDocs(qStores)

        const docs = qStoreSnapshot.docs.map(doc => ({
            id: doc.id,    // Get the document ID
            ...doc.data()  // Spread the rest of the document data
        }));

        if(qStoreSnapshot.empty){
            return NextResponse.json({
            //no tiene stores
                success:true,
                data:docs,
            })
        }else{
            //tiene stores
            return NextResponse.json({
                success:false,
                message:"Error buscando"
            })
        }
    }
}

export async function PATCH(req) {
    console.log("hola")
    const {owner , data} = await req.json()
    try{
        const qStores = query(collection(db, "stores"), where("owner", "==", owner));
        const qStoreSnapshot = await getDocs(qStores)
    
        const docs = qStoreSnapshot.docs.map(doc => ({
            id: doc.id,    // Get the document ID
            ...doc.data()  // Spread the rest of the document data
        }));

        const storeDocRef = doc(db, "stores", docs[0].id);
                await updateDoc(storeDocRef, {
                    socials:data
                });
        return NextResponse.json({
            success: true,
            message: "Trabajo Archivado correctamente."
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Error guardando servicios.",
        })
    }
}