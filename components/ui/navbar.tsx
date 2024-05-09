import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

interface NavBarProps {
  // Define any props if needed
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <header className="top-0 left-0 w-full bg-white shadow-md z-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/EzTransparentLogo.png"
            width="100"
            height="100"
            alt="Logo"
          />
          <span className="text-lg font-bold">EZHealth</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex" variant={"outline"}>
            Register
          </Button>
          <Button className="hidden md:inline-flex">Login</Button>
          <Button className="md:hidden" size={"icon"} variant={"outline"}>
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
