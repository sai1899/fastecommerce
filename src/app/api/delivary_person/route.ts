import { db } from "@/app/db/db"
import { delivary_person, warehouse } from "@/app/db/schema"
import { delivarySchema } from "@/lib/validator/delivarySchema";

import { asc, desc } from "drizzle-orm";

export async function POST(request:Request,response:Response){

    
    const data= await request.json()

    console.log("data is",data)
    
    let validatedData

    try{

        validatedData= await delivarySchema.parse({
              name:data.name,
              phone:data.phone,
              warehouse_id:Number(data.warehouse_id)
          })
          
      }

      catch(error){

          console.log(error)
          return Response.json({message:error},{status:400})
      }

      try{

        await db.insert(delivary_person).values(validatedData)

    
        return Response.json('ok',{status:201})

      }

      catch(error){

            return Response.json({message:'Not able to insert value in the databse'},{status:500})
      }


}


export async function GET(response:Response) {


    try{
        const allDelivary=await db.select().from(delivary_person).orderBy(desc(delivary_person.id))

        return Response.json({allDelivary},{status:200})
    }
    catch(error){

        return Response.json({'message':'Not able to get warehouse products'},{status:500})
    }
    
}