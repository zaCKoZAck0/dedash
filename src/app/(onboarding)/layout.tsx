export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
        {children}
      </div>
    </main>
  );
}
