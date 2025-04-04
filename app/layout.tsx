import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const montserratSans = Montserrat({
  variable: "--font-monserrat-sans-serif",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "NextPay",
  description: "This is a Solution to Seamless financial transactions",
  icons: {
    icon: '/icons/pay.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserratSans.variable} ${interSans.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
