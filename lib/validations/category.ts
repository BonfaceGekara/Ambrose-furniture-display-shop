
import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name is too long"),

    description: z
        .string()
        .trim()
        .max(300, "Description is too long")
        .optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
