import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: 'Collins',
    lastName: 'Legacy'
  }
  return (
    <main className="flex h-screen w-full font-montserrat">
      <Sidebar user={loggedIn} />
        {children}
    </main>
  );
}
