
"use server";

import { db } from "@/prisma/db";
import { registerSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/password";

export async function registerUser(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // 1. Validate input
    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0]?.message ?? "Invalid input",
        };
    }

    const { name, email, password } = validatedFields.data;

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3. Check whether the user already exists
    const existingUser = await db.orm.public.User
        .where({ email: normalizedEmail })
        .first();

    if (existingUser) {
        return {
            error: "An account with this email already exists.",
        };
    }

    // 4. Hash password
    const passwordHash = await hashPassword(password);

    // 5. Create user
    try {
        await db.orm.public.User.create({
            name,
            email: normalizedEmail,
            passwordHash,
        });

        return {
            success: "Account created successfully!",
        };
    } catch (error) {
        console.error("Registration error:", error);

        return {
            error: "Unable to create your account. Please try again.",
        };
    }
}
