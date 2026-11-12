"use client";

import { useState } from "react";
import { createProduct } from "@/app/actions/products";

type Category = {
    id: string;
    name: string;
};

type ProductFormProps = {
    categories: Category[];
};

export default function ProductForm({ categories }: ProductFormProps) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const result = await createProduct(formData);

            if (result.error) {
                setError(result.error);
            }

            if (result.success) {
                setSuccess(result.success);

                const form = document.getElementById(
                    "product-form"
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
            id="product-form"
            action={handleSubmit}
            className="space-y-4 rounded-xl border bg-white p-6"
        >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Product name
                </label>
                <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="e.g. Modern 3-Seater Sofa"
                    className="w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>
                <textarea
                    name="description"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Describe the furniture..."
                    className="w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Price (KES)
                </label>
                <input
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="25000"
                    className="w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Stock quantity
                </label>
                <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    required
                    defaultValue="0"
                    className="w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Category
                </label>
                <select
                    name="categoryId"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border p-3"
                >
                    <option value="" disabled>
                        Select a category
                    </option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {success && (
                <p className="text-sm text-green-600">{success}</p>
            )}

            <button
                type="submit"
                disabled={loading || categories.length === 0}
                className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create product"}
            </button>

            {categories.length === 0 && (
                <p className="text-sm text-red-600">
                    Create a category before adding products.
                </p>
            )}
        </form>
    );
}