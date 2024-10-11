import { db } from "@/app/db/db";
import { product } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request:Request,{params}:{params:{id:string}},response:Response){

    const id=params.id


    try{

        const singleProuct=await db.select().from(product).where(eq(product.id,Number(id)))

        if(!singleProuct){

            return Response.json({'message':'message id is not valid'},{status:400})
        }

        return Response.json(singleProuct,{status:200})

    }

    catch(error){

        return Response.json({'message':'Not able to fetch products'},{status:500})
    }

    


}