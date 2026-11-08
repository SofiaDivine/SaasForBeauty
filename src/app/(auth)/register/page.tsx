import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Реєстрація · TFP-Bundle",
};

export default function RegisterPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Реєстрація</h1>
        <p className="text-sm text-stone-600">
          Звичайний профіль або профіль майстра.
        </p>
      </header>
      <AuthForm>
        <label className="block space-y-1 text-sm">
          <span>Ім&apos;я</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            className="w-full rounded-2xl border border-stone-300 px-3 py-2"
          />
        </label>
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
            autoComplete="new-password"
            required
            className="w-full rounded-2xl border border-stone-300 px-3 py-2"
          />
        </label>
        <fieldset className="space-y-2 text-sm">
          <legend>Роль</legend>
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="USER" defaultChecked />
            Користувач
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="role" value="PRO_MASTER" />
            Майстер
          </label>
        </fieldset>
        <button
          type="submit"
          className="w-full rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          Створити обліковий запис
        </button>
      </AuthForm>
      <p className="text-sm text-stone-600">
        Вже є профіль?{" "}
        <Link href="/login" className="font-medium text-stone-900 underline-offset-4 hover:underline">
          Увійти
        </Link>
      </p>
    </main>
  );
}
