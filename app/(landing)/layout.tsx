import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EzHealth Landing Page",
  description: "EzHealth",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <NavBar />
      {children}
    </div>
  );
}
