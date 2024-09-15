import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function GET(request) {

    //todo secure endpoint 
    /* Get the collection product (all products) */
    const productosCall = collection(db, "products")

    /* If searching for a acategory, we use query */
    const categoria = "todos"
    const q = categoria == "todos"? productosCall : query(productosCall.where("type", "==" ,"todos"))


    /* Get the docs */
    const querySapshot = await getDocs(q)

    /* Get the actual data */
    // const docs = querySapshot.docs.map(doc => doc.data())

    /* Get the actual data with the ID */
    const docs = querySapshot.docs.map(doc => ({
        id: doc.id,    // Get the document ID
        ...doc.data()  // Spread the rest of the document data
    }));




    /* return the array */
    return NextResponse.json(docs)
    // return NextResponse.json({false:true})
}