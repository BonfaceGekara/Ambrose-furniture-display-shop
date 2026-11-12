"use server";

import { db } from "@/prisma/db";
import { requireAdmin } from "@/lib/auth-guards";
import { categorySchema } from "@/lib/validations/category";
import { revalidatePath } from "next/cache";

function createSlug(name: string) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export async function createCategory(formData: FormData) {
    await requireAdmin();

    const validatedFields = categorySchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description") || undefined,
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0]?.message ?? "Invalid input",
        };
    }

    const { name, description } = validatedFields.data;
    const slug = createSlug(name);

    try {
        const existing = await db.orm.public.Category
            .where({ slug })
            .first();

        if (existing) {
            return { error: "A category with this name already exists." };
        }

        await db.orm.public.Category.create({
            name,
            slug,
            description: description || null,
        });

        revalidatePath("/admin/categories");
        return { success: "Category created successfully!" };
    } catch (error) {
        console.error("Category creation error:", error);
        return { error: "Unable to create category. Please try again." };
    }
}

export async function updateCategory(formData: FormData) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        return { error: "Invalid category ID." };
    }

    const validatedFields = categorySchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description") || undefined,
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0]?.message ?? "Invalid input",
        };
    }

    const { name, description } = validatedFields.data;
    const slug = createSlug(name);

    try {
        const existingCategory = await db.orm.public.Category
            .where({ slug })
            .first();

        if (existingCategory && existingCategory.id !== id) {
            return { error: "Another category already uses this name." };
        }

        const updated = await db.orm.public.Category
            .where({ id })
            .update({
                name,
                slug,
                description: description || null,
            });

        if (!updated) {
            return { error: "Category not found." };
        }

        revalidatePath("/admin/categories");
        return { success: "Category updated successfully!" };
    } catch (error) {
        console.error("Category update error:", error);
        return { error: "Unable to update category. Please try again." };
    }
}

export async function deleteCategory(formData: FormData) {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || !id) {
        return { error: "Invalid category ID." };
    }

    try {
        const existingCategory = await db.orm.public.Category
            .where({ id })
            .first();

        if (!existingCategory) {
            return { error: "Category not found." };
        }

        const product = await db.orm.public.Product
            .where({ categoryId: id })
            .first();

        if (product) {
            return {
                error: "You cannot delete this category because it contains products.",
            };
        }

        await db.orm.public.Category.where({ id }).delete();

        revalidatePath("/admin/categories");
        return { success: "Category deleted successfully!" };
    } catch (error) {
        console.error("Category deletion error:", error);
        return { error: "Unable to delete category. Please try again." };
    }
}
