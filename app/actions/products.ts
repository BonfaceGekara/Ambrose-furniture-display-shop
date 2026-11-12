"use server";

import { db } from "@/prisma/db";
import { requireAdmin } from "@/lib/auth-guards";
import { productSchema } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    await requireAdmin();

    const validatedFields = productSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        categoryId: formData.get("categoryId"),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0]?.message ?? "Invalid input",
        };
    }

    const { name, description, price, stock, categoryId } =
        validatedFields.data;

    const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    try {
        const existingProduct = await db.orm.public.Product
            .where({ slug })
            .first();

        if (existingProduct) {
            return { error: "A product with this name already exists." };
        }

        const category = await db.orm.public.Category
            .where({ id: categoryId })
            .first();

        if (!category) {
            return { error: "The selected category does not exist." };
        }

        await db.orm.public.Product.create({
            name,
            slug,
            description,
            price,
            stock,
            categoryId,
        });

        revalidatePath("/admin/products");

        return { success: "Product created successfully!" };
    } catch (error) {
        console.error("Product creation error:", error);
        return { error: "Unable to create product. Please try again." };
    }
}