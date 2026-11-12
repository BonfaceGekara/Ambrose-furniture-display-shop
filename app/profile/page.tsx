import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <main className="mx-auto max-w-2xl p-8">
            <h1 className="mb-6 text-2xl font-bold">
                My Profile
            </h1>

            <div className="space-y-3 rounded-xl border p-6">
                <p>
                    <strong>Name:</strong> {session.user.name}
                </p>

                <p>
                    <strong>Email:</strong> {session.user.email}
                </p>

                <p>
                    <strong>User ID:</strong> {session.user.id}
                </p>

                <p>
                    <strong>Role:</strong> {session.user.role}
                </p>
            </div>
        </main>
    );
}