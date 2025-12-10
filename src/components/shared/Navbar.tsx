"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LucideMenu, LucideX } from "lucide-react";
import { navigationLinks } from "@/utils/NavbarRole";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md font-bold">
      <div className="w-11/12 mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          EventMates
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right buttons (Desktop) */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <Link href="/becomeHost">
              <button className="px-4 py-2 text-sm font-medium bg-orange-400 text-white rounded-md hover:bg-orange-500 transition">
                Become a Host
              </button>
            </Link>

            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md ">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <LucideX size={24} />
            ) : (
              <LucideMenu size={24} />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col gap-2 p-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            <Link href="/becomeHost">
              <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Become a Host
              </button>
            </Link>

            <Link href="/login">
              <button className="w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="w-full px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
