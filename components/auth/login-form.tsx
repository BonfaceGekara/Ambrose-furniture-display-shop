
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setLoading(true);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password.");
                return;
            }

            window.location.href = "/";
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Email address
                </label>

                <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Password
                </label>

                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Your password"
                    className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}
