
"use client";

import { useState } from "react";
import {
    updateCategory,
    deleteCategory,
} from "@/app/actions/categories";

type CategoryItemProps = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
};

export default function CategoryItem({
    id,
    name,
    slug,
    description,
}: CategoryItemProps) {
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleUpdate(formData: FormData) {
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const result = await updateCategory(formData);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                setMessage(result.success);
                setEditing(false);
            }
        } catch {
            setError("Something went wrong while updating.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(formData: FormData) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${name}"?`
        );

        if (!confirmed) return;

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const result = await deleteCategory(formData);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                setMessage(result.success);
            }
        } catch {
            setError("Something went wrong while deleting.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-lg border bg-white p-5">
            {editing ? (
                <form action={handleUpdate} className="space-y-3">
                    <input type="hidden" name="id" value={id} />

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Category name
                        </label>
                        <input
                            name="name"
                            defaultValue={name}
                            required
                            minLength={2}
                            maxLength={50}
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={description ?? ""}
                            maxLength={300}
                            rows={3}
                            className="w-full rounded-lg border p-3"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save changes"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setError("");
                            }}
                            className="rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h3 className="font-semibold">{name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {description || "No description"}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                        Slug: {slug}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(true);
                                setError("");
                                setMessage("");
                            }}
                            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                        >
                            Edit
                        </button>

                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={id} />
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </form>
                    </div>
                </>
            )}

            {message && (
                <p className="mt-3 text-sm text-green-700">{message}</p>
            )}

            {error && !editing && (
                <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
