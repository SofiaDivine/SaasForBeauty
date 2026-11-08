"use client";

export function AuthForm({ children }: { children: React.ReactNode }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
