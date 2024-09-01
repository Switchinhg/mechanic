import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function POST(request) {

    const {email} = await request.json()
    
    console.log(email)

    const q = query(collection(db, "users"), where("Email", "==", email));

    const querySapshot = await getDocs(q)
 
    if (!querySapshot.empty){
        const doc = querySapshot.docs[0].data()
        const qStores = query(collection(db, "stores"), where("owner", "==", email));
        const qStoreSnapshot = await getDocs(qStores)

        if(qStoreSnapshot.empty){
            //tiene stores
            return NextResponse.json({
                success:true,
                message: "Puede crear tienda"
            })
        }else{
            //no tiene stores
            return NextResponse.json({
                success:false,
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