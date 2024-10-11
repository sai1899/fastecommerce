import { db } from "@/app/db/db";
import { product } from "@/app/db/schema";
import { productSchema } from "@/lib/validator/productSchema";
import { asc, desc } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

import { writeFile } from 'fs/promises';



const fs = require('node:fs');

export async function POST(request:Request,response:Response) {

    console.log("in api products")

    const data=await request.formData()

    const description = data.get('description')

    const second = data.get('image')

    const name = data.get('name')

    const path = require('path');

    let validatedData

    try{

      validatedData= await productSchema.parse({
            name:data.get('name'),
            description:data.get('description'),
            image:data.get('image'),
            price:Number(data.get('price'))
        })

    }

    

    catch(error){
        return Response.json({message:error},{status:400})
    }

    console.log("validatedData is",validatedData)

    const filename = `${Date.now()}.jpeg`

    const price = Number(data.get('price'))

    console.log(filename)

    var bufferimage = Buffer.from(await second?.arrayBuffer())

    console.log(bufferimage)

    console.log(process.cwd())


    console.log(path.join(process.cwd(),'public/assets',filename))

    const fullPath = path.join(process.cwd(), 'public/assets', filename);

    try{

        await writeFile(fullPath, bufferimage);

    }

    catch(error){
        
        console.log("in error")
        console.log(error?.message)
    }

    try{

        await db.insert(product).values({name,description,price,image:filename})

    }

    catch(error){

        return new Response('Product is not fixed',{status:500})

    }
    

    

    return new Response('ok')
    
}


export async function GET(request:Request,response:Response){

    try

    {

         const allProducts=await db.select().from(product).orderBy(desc(product.id));
         console.log(allProducts)
        //  return new Response(JSON.stringify(allProducts),{status:201})
          return Response.json(allProducts,{status:201})

    }

    catch(error){

        console.log(error)

        return Response.json({message:'Not able to fetch data'},{status:500})
    }


    

    


    

    

}