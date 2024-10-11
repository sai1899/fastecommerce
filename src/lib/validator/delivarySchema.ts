import { z } from 'zod';
import { fromError } from 'zod-validation-error';

export const delivarySchema = z.object({
    name: z.string({message:'Please enter characters only'}).min(4),
    phone: z.string({message:'phone number should contain atleast 10 number'}).length(13),
    warehouse_id:z.number({'message':'warehouse should be a number'}),
    order_id:z.number({'message':'warehouse should be a number'}).optional()
  });