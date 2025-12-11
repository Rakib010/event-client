"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LucideMenu, LucideX } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user, reload } = useUser();
  const router = useRouter();

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await api.post("auth/logout");
      reload();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  // Role-based links
  const getLinks = () => {
    if (!user)
      return [
        { label: "Home", href: "/" },
        { label: "Explore Events", href: "/event" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Become a Host", href: "/becomeHost" },
      ];

    switch (user.role) {
      case "user":
        return [
          { label: "Explore Events", href: "/events" },
          { label: "My Events", href: "/dashboard" },
          { label: "Profile", href: `/profile/${user.userId}` },
        ];
      case "host":
        return [
          { label: "Explore Events", href: "/events" },
          { label: "My Events (Hosted)", href: "/dashboard" },
          { label: "Create Event", href: "/events/create" },
          { label: "Profile", href: `/profile/${user.userId}` },
        ];
      case "admin":
        return [{ label: "Admin Dashboard", href: "/dashboard" }];
      default:
        return [];
    }
  };
  const links = getLinks();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          EventMates
        </Link>

        {/* Desktop menu */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right buttons */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            {!user && (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col gap-2 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <>
                <Link href="/login">
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={logout}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
