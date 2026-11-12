
export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Manage your furniture shop from here.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-white p-6">
                    <h2 className="font-semibold">Products</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage your furniture products.
                    </p>
                    <a
                        href="/admin/products"
                        className="mt-4 inline-block font-medium text-blue-600"
                    >
                        Manage products →
                    </a>
                </div>

                <div className="rounded-xl border bg-white p-6">
                    <h2 className="font-semibold">Categories</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Organize your furniture categories.
                    </p>
                    <a
                        href="/admin/categories"
                        className="mt-4 inline-block font-medium text-blue-600"
                    >
                        Manage categories →
                    </a>
                </div>

                <div className="rounded-xl border bg-white p-6">
                    <h2 className="font-semibold">Orders</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        View and manage customer orders.
                    </p>
                    <a
                        href="/admin/orders"
                        className="mt-4 inline-block font-medium text-blue-600"
                    >
                        Manage orders →
                    </a>
                </div>
            </div>
        </div>
    );
}
