import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GoogleSignIn } from "@/components/auth/google-sign-in";
import { safeCallbackUrl } from "@/lib/callback-url";

export const metadata: Metadata = {
  title: "Вхід · TFP-Bundle",
};

const loginErrors: Record<string, string> = {
  AccessDenied: "Google не надав підтверджену пошту, або вхід скасовано.",
  Configuration: "Вхід через Google ще не налаштований.",
  OAuthSignin: "Не вдалося почати вхід через Google.",
  OAuthCallback: "Google не підтвердив вхід. Спробуйте ще раз.",
  OAuthAccountNotLinked: "Ця пошта вже прив’язана до іншого способу входу.",
  Callback: "Не вдалося завершити вхід через Google.",
  Database: "Не вдалося зберегти профіль. Перевірте, чи доступна база даних.",
  Default: "Не вдалося увійти. Спробуйте ще раз.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Вхід</h1>
        <p className="text-sm text-stone-600">
          Увійдіть через Google-пошту. Якщо профілю ще немає, він створиться автоматично.
        </p>
      </header>
      <Suspense fallback={<p className="text-sm text-stone-500">Завантажуємо вхід…</p>}>
        <LoginPanel searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function LoginPanel({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const error = params.error ? (loginErrors[params.error] ?? loginErrors.Default) : null;
  const callbackUrl = await safeCallbackUrl(params.callbackUrl);

  return (
    <div className="space-y-4">
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <GoogleSignIn callbackUrl={callbackUrl} />
      <p className="text-sm text-stone-600">
        Немає облікового запису?{" "}
        <Link href="/register" className="font-medium text-stone-900 underline-offset-4 hover:underline">
          Реєстрація
        </Link>
      </p>
    </div>
  );
}
