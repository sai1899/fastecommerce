import { z } from 'zod';
import { fromError } from 'zod-validation-error';

export const inventorySchema = z.object({
    sku:z.string({message:'product id is number'}).length(8),
    product_id: z.number({message:'product id is number'}),
    warehouse_id:z.number({message:'warehouse id is number'}),
    order_id:z.number({message:'product id is number'}).optional()
  });