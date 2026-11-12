
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/prisma/db";
import { loginSchema } from "@/lib/validations/auth";
import { verifyPassword } from "@/lib/password";

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields =
                    loginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    return null;
                }

                const { email, password } = validatedFields.data;

                const user = await db.orm.public.User
                    .where({ email: email.toLowerCase() })
                    .first();

                if (!user || !user.passwordHash) {
                    return null;
                }

                const passwordMatches = await verifyPassword(
                    password,
                    user.passwordHash
                );

                if (!passwordMatches) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
            
        }),
        
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                session.user.role = token.role as "CUSTOMER" | "ADMIN";
            }

            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
});
