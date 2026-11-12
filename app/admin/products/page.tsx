import { connection } from "next/server";
import { db } from "@/prisma/db";
import ProductForm from "@/components/admin/product-form";

export default async function ProductsPage() {
    await connection();

    const categories = await db.orm.public.Category.all();
    const products = await db.orm.public.Product.all();

    return (
        <div>
            <h1 className="text-3xl font-bold">Products</h1>

            <p className="mt-2 text-gray-500">
                Add and manage the furniture available in your shop.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <section>
                    <h2 className="mb-4 text-xl font-semibold">
                        Add a product
                    </h2>

                    <ProductForm categories={categories} />
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">
                        Existing products ({products.length})
                    </h2>

                    <div className="space-y-3">
                        {products.length === 0 ? (
                            <p className="rounded-lg border bg-white p-5 text-gray-500">
                                No products have been added yet.
                            </p>
                        ) : (
                            products.map((product) => {
                                const category = categories.find(
                                    (item) => item.id === product.categoryId
                                );

                                return (
                                    <div
                                        key={product.id}
                                        className="rounded-lg border bg-white p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {category?.name ?? "Unknown category"}
                                                </p>
                                            </div>

                                            <span className="font-semibold">
                                                KES {Number(product.price).toLocaleString("en-KE")}
                                            </span>
                                        </div>

                                        <p className="mt-3 text-sm text-gray-600">
                                            {product.description}
                                        </p>

                                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                                            <span>Stock: {product.stock}</span>
                                            <span>Slug: {product.slug}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}