import { z } from "zod";

export const productSchema = z.object({
    name: z.string().trim().min(2, "Product name must be at least 2 characters").max(100),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().positive("Price must be greater than zero"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    categoryId: z.string().min(1, "Please select a category"),
});

export type ProductInput = z.infer<typeof productSchema>;