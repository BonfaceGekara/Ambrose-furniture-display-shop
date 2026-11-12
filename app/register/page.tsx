
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
                <h1 className="mb-2 text-2xl font-bold">
                    Create an account
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    Register to start shopping for furniture.
                </p>

                <RegisterForm />
            </div>
        </main>
    );
}
