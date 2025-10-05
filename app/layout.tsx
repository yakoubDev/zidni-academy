import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zidni | زدني",
  description: "Learn Quran and Strengthen your faith online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased `}>
        <AuthProvider>
          <Nav />
          {children}
          <Toaster position="bottom-right" duration={2000} />
        </AuthProvider>
      </body>
    </html>
  );
}
