import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

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
                message: "Puede crear tienda"
            })
        }else{
            //tiene stores
            return NextResponse.json({
                success:false,
                data:docs,
                message: "No puede crear tienda"
            })
        }

    }else{
        return NextResponse.json({
            success:false,
            message: "No se encontro usuario"
        })

    }
}