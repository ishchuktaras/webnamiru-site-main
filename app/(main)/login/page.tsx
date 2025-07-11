// app/(main)/login/page.tsx

import LoginForm from "@/components/login-form";

// ZMĚNA: Přesunuto sem. Tímto zajistíme, že tato stránka a VŠECHNY akce,
// které volá, poběží v plnohodnotném Node.js prostředí.
export const runtime = 'nodejs';

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
            <LoginForm />
        </div>
    );
}