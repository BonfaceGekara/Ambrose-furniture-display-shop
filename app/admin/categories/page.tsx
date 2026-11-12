import { db } from "@/prisma/db";
import CategoryForm from "@/components/admin/category-form";
import CategoryItem from "@/components/admin/category-item";

export default async function CategoriesPage() {
    const categories = await db.orm.public.Category.all();

    return (
        <div>
            <h1 className="text-3xl font-bold">Categories</h1>

            <p className="mt-2 text-gray-500">
                Create and organize your furniture categories.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <section>
                    <h2 className="mb-4 text-xl font-semibold">
                        Add a category
                    </h2>

                    <CategoryForm />
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">
                        Existing categories ({categories.length})
                    </h2>

                    <div className="space-y-3">
                        {categories.length === 0 ? (
                            <p className="rounded-lg border bg-white p-5 text-gray-500">
                                No categories have been created yet.
                            </p>
                        ) : (
                            categories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    slug={category.slug}
                                    description={category.description}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
