
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
                <h1 className="mb-2 text-2xl font-bold">
                    Welcome back
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    Sign in to your furniture shop account.
                </p>

                <LoginForm />
            </div>
        </main>
    );
}
