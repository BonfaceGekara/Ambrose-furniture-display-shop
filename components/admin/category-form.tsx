
"use client";

import { useState } from "react";
import { createCategory } from "@/app/actions/categories";

export default function CategoryForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await createCategory(formData);

            if (result.error) {
                setError(result.error);
            }

            if (result.success) {
                setSuccess(result.success);

                const form = document.getElementById(
                    "category-form"
                ) as HTMLFormElement | null;

                form?.reset();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            id="category-form"
            action={handleSubmit}
            className="space-y-4 rounded-xl border bg-white p-6"
        >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Category name
                </label>

                <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder="e.g. Sofas"
                    className="w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    maxLength={300}
                    placeholder="Describe this category..."
                    rows={3}
                    className="w-full rounded-lg border p-3"
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
                className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create category"}
            </button>
        </form>
    );
}
