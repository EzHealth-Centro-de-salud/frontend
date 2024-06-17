import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { AdminMenuLinks } from "@/constants/menuLinks";
import { ChakraProvider } from "@chakra-ui/react";

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
    <div className={`${inter.className} flex h-full`}>
      <ChakraProvider>
        <Sidebar menuLinks={AdminMenuLinks} />
        {children}
      </ChakraProvider>
    </div>
  );
}
