import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { AdminMenuLinks } from "@/constants/menuLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN - EZHealth",
  description: "Admin pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={inter.className}>
      <div className="flex h-full">
        <Sidebar menuLinks={AdminMenuLinks} />
        {children}
      </div>
    </body>
  );
}
