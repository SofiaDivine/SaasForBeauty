import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Вхід · TFP-Bundle",
};

export default function LoginPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Вхід</h1>
        <p className="text-sm text-stone-600">
          Для клієнтів і б&apos;юті-майстрів.
        </p>
      </header>
      <AuthForm>
        <label className="block space-y-1 text-sm">
          <span>Електронна пошта</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-stone-300 px-3 py-2"
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-stone-300 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          Увійти
        </button>
      </AuthForm>
      <p className="text-sm text-stone-600">
        Немає облікового запису?{" "}
        <Link href="/register" className="font-medium text-stone-900 underline-offset-4 hover:underline">
          Реєстрація
        </Link>
      </p>
    </main>
  );
}
