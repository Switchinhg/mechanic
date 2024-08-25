import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


export async function POST(request) {
    /* Login */
    const {action, email,password} = await request.json()
   
    /* Use to update data */
}