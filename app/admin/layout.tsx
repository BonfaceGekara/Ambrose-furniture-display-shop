
import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guards";
import LogoutButton from "@/components/auth/logout-button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await requireAdmin();

    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            {/* Sidebar */}
            <aside className="w-full bg-gray-950 p-6 text-white md:min-h-screen md:w-64">
                <Link href="/admin">
                    <h1 className="mb-8 text-2xl font-bold">
                        Furniture Admin
                    </h1>
                </Link>

                <nav className="space-y-3">
                    <Link
                        href="/admin"
                        className="block rounded-lg px-4 py-3 hover:bg-gray-800"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/products"
                        className="block rounded-lg px-4 py-3 hover:bg-gray-800"
                    >
                        Products
                    </Link>

                    <Link
                        href="/admin/categories"
                        className="block rounded-lg px-4 py-3 hover:bg-gray-800"
                    >
                        Categories
                    </Link>

                    <Link
                        href="/admin/orders"
                        className="block rounded-lg px-4 py-3 hover:bg-gray-800"
                    >
                        Orders
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <div className="min-w-0 flex-1">
                <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                    <div>
                        <p className="font-semibold">{admin.name}</p>
                        <p className="text-sm text-gray-500">
                            Administrator
                        </p>
                    </div>

                    <LogoutButton />
                </header>

                <main className="p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
