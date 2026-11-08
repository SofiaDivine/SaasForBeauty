export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6">
        {children}
      </div>
    </div>
  );
}
