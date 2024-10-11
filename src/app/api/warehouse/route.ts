import { db } from "@/app/db/db"
import { warehouse } from "@/app/db/schema"
import { warehouseSchema } from "@/lib/validator/warehouseSchema";
import { asc, desc } from "drizzle-orm";


export async function POST(request:Request,response:Response){

    
    const data= await request.json()

    console.log("data is",data)
    
    let validatedData

    try{

        validatedData= await warehouseSchema.parse({
              name:data.name,
              pincode:Number(data.pincode)
          })
          
        
      }

      catch(error){
         
          return Response.json({message:error},{status:400})
      }

      try{

        await db.insert(warehouse).values(validatedData)

        return Response.json({'message':'ok'},{status:201})

      }

      catch(error){

            return Response.json({message:'Not able to insert value in the databse'},{status:500})
      }


}


export async function GET(response:Response) {


    try{
        const allWarehouse=await db.select().from(warehouse).orderBy(desc(warehouse.id))

        return Response.json({allWarehouse},{status:200})
    }
    catch(error){

        return Response.json({'message':'Not able to get warehouse products'},{status:500})
    }
    
}