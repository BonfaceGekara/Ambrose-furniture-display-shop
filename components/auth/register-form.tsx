
"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions/auth";

export default function RegisterForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await registerUser(formData);

            if (result.error) {
                setError(result.error);
            }

            if (result.success) {
                setSuccess(result.success);
            }
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
                    Full name
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    placeholder="John Doe"
                    className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

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
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {success && (
                <p className="text-sm text-green-600">{success}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {loading ? "Creating account..." : "Create account"}
            </button>
        </form>
    );
}
