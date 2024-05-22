'use client';
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface menuLink {
  name: string;
  link: string;
}

const Sidebar: React.FC<{ menuLinks: menuLink[] }> = ({ menuLinks }) => {
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block w-1/6 h-full">
      <div className="flex max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            className="flex items-center gap-1 font-semibold"
            href={menuLinks[0].link}
          >
            <Image
              src="/EzTransparentLogo.png"
              width="60"
              height="60"
              alt="Logo"
            />
            <span>EZHealth</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === link.link
                    ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                href={link.link}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <div className="flex items-center justify-center h-12 border-t">
            <span className="text-gray-500">
              © {new Date().getFullYear()} EZHealth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
