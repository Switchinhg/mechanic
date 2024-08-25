import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";

export async function POST(request) {
    /* Login */
    const {action} = await request.json()
    if(action == "login"){
        return NextResponse.json({"success":true})
    }else if(action == "register"){
        return NextResponse.json({"success":true})

    }
    // return NextResponse.json(docs)
}