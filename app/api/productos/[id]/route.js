import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function GET(request, {params}) {
    //todo secure endpoint 
    /* Get the collection product (all products) */
    const productosCall = doc(db, "products" , params.id)
    const docSnap = await getDoc(productosCall);
        // return NextResponse.json(docs)
        // return NextResponse.json({false:true})
        if (docSnap.exists()) {
            // If the document exists, return its data along with the document ID
            const product = {
                id: docSnap.id,      // The document ID
                ...docSnap.data()    // The document data
            };
            return NextResponse.json(product);
        } else {
            // If the document doesn't exist, you can handle it here (e.g., return an error response)
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

    






}