import { z } from 'zod';
import { fromError } from 'zod-validation-error';

export const productSchema = z.object({
    name: z.string({message:'Please enter characters only'}).min(4),
    image: z.instanceof(File, {message:'Product image should be image'}),
    description: z.string({ message: 'Product description should be a string' }).min(8),
    price:z.number({message:'product price should be a number'})

  });

