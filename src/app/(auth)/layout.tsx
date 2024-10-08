export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>Login to DeDash</h1>
        {children}
      </div>
    </main>
  );
}
