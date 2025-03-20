import Mobilemenu from "@/components/Mobilemenu";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

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

      <div className="flex size-full flex-col">
        <div className="flex justify-between md:hidden shadow-md h-16 p-5 items-center sm:p-4">
          <Image
            src="/icons/pay.png"
            alt="logo"
            className=""
            width={30}
            height={30}
          />
          <Mobilemenu user={loggedIn} />
        </div>
        {children}
      </div>
    </main>
  );
}
