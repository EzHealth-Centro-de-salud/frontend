import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EzHealth - Usuarios",
  description: "Páginas de inicio de EzHealth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
