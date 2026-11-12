
import { requireUser } from "@/lib/auth-guards";
import LogoutButton from "@/components/auth/logout-button";

export default async function AccountPage() {
    const user = await requireUser();

    return (
        <main className="mx-auto max-w-3xl p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    My Account
                </h1>

                <LogoutButton />
            </div>

            <div className="mt-6 space-y-3 rounded-xl border p-6">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </main>
    );
}
