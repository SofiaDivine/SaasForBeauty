import { signOut } from "@/auth";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form
      className="inline"
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className={className ?? "text-sm text-stone-600 hover:text-stone-900"}
      >
        Вийти
      </button>
    </form>
  );
}
