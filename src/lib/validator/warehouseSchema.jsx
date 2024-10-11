import { z } from 'zod';
import { fromError } from 'zod-validation-error';

export const warehouseSchema = z.object({
    name: z.string({message:'Please enter characters only'}).min(4),
    pincode: z.number({message:'Please enter number only'}).min(6),
  });