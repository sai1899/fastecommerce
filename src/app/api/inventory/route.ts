import { db } from "@/app/db/db"
import { delivary_person, inventory, product, warehouse } from "@/app/db/schema"
import { delivarySchema } from "@/lib/validator/delivarySchema";
import { inventorySchema } from "@/lib/validator/inventorySchema";

import { asc, desc, eq } from "drizzle-orm";
import { on } from "events";



export async function POST(request:Request,response:Response){

    
    const data= await request.json()

    console.log("data is",data)
  
    let validatedData
    
    try{

        validatedData= await inventorySchema.parse({
              sku:data.sku,
              product_id:Number(data.product_id),
              warehouse_id:Number(data.warehouse_id)
          })
          
      }

      catch(error){

          console.log(error)
          return Response.json({message:error},{status:400})
      }

      try{

        await db.insert(inventory).values(validatedData)

    
        return Response.json('ok',{status:201})

      }

      catch(error){

            return Response.json({message:'Not able to insert value in the databse'},{status:500})
      }


}


export async function GET(response:Response) {


    try{
        const allInventory=await db.select({
            id:inventory.id,
            sku:inventory.sku,
            product:product.name,
            warehouse:warehouse.name
        }).from(inventory).leftJoin(product,eq(inventory.product_id,product.id))
        .leftJoin(warehouse,eq(inventory.warehouse_id,warehouse.id))
        .orderBy(desc(inventory.id))

        return Response.json({allInventory},{status:200})
    }
    catch(error){

        console.log(error)

        return Response.json({'message':'Not able to get Inventory products'},{status:500})
    }
    
}