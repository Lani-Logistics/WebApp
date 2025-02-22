  import { Link } from "react-router-dom";
import { headerLinks } from "@/Constants/data";
import { ThemeToggle } from "../UI";
import { Menu } from "lucide-react";
import SideMenu from "./Menu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-sm">
        <nav className="main flex items-center justify-between h-[70px]">
          {/* logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo-orange.png" alt="logo" width={35} />
            <h3 className="text-2xl font-sora font-bold">Lani</h3>
          </Link>
          <div className="items-center gap-8 hidden md:flex">
            {/* links */}
            <ul className="flex items-center gap-4">
              {headerLinks.map((link) => (
                <li key={link.title}>
                  <a href={`#${link.path}`} className="text-sub font-light hover:bg-background hover:text-main transition-all duration-300 px-3 py-2 rounded-md">{link.title}</a>
                </li>
              ))}
            </ul>

            <div className="h-9 w-[1px] bg-line" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {/* auth buttons */}
              <Link
                to="/app"
                className="bg-primary text-white font-medium font-sora px-4 py-2 rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/app"
              className="bg-primary btn text-white font-medium font-sora px-4 h-10"
            >
              Get Started
            </Link>
            <Menu size={24} onClick={toggleMenu} />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && <SideMenu isOpen={isOpen} onClose={toggleMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
