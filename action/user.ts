"use server"

import { db } from "@/app/db/db"
import { Users } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation";




export const register=async(formData:FormData)=>{

    const firstName=formData.get('firstname')

    const lastName = formData.get('lastname')

    const email = formData.get('email')

    const password = formData.get('password')

    console.log(lastName,email,password)


    if(!firstName || !lastName || !email || !password){
        return new Error("Please specify all fields")
    }

    const registered=await db.select().from(Users).where(eq(Users.email,email))

    if(registered.length > 0){
        return new Error("user is already registered")
    }
    else{
        await db.insert(Users).values({
            fname:firstName,
            email: email,
            password: password,
            provider: 'normal',
            role: 'customer'
          });
          redirect("/login");
    }



}

