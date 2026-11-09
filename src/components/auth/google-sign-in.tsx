import { isGoogleAuthConfigured } from "@/auth.config";
import { signIn } from "@/auth";
import { GoogleSubmitButton } from "@/components/auth/google-submit-button";

export function GoogleSignIn({
  callbackUrl = "/profile/me",
  label = "Увійти через Google",
}: {
  callbackUrl?: string;
  label?: string;
}) {
  if (!isGoogleAuthConfigured()) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-900 opacity-60"
        >
          {label}
        </button>
        <p className="text-sm text-stone-600">
          Додайте <code>AUTH_GOOGLE_ID</code> і <code>AUTH_GOOGLE_SECRET</code> у{" "}
          <code>.env</code>. У Google Cloud для redirect URI вкажіть{" "}
          <code>http://localhost:3000/api/auth/callback/google</code>.
        </p>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: callbackUrl });
      }}
    >
      <GoogleSubmitButton label={label} />
    </form>
  );
}
