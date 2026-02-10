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

  const { user, loading, reload } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FIX: Prevent Navbar Flashing
  if (loading) {
    return (
      <header className="w-full p-4 shadow bg-white">
        <div className="animate-pulse h-6 w-32 bg-gray-300 rounded"></div>
      </header>
    );
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      reload();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getLinks = () => {
    if (!user) {
      return [
        { label: "Explore Events", href: "/events" },
        { label: "Become a Host", href: "/becomeHost" },
      ];
    }

    if (user.role === "user") {
      return [
        { label: "Explore Events", href: "/events" },
        { label: "My Events", href: "/dashboard" },
        { label: "Profile", href: `/profile` },
      ];
    }

    if (user.role === "host") {
      return [
        { label: "Explore Events", href: "/events" },
        { label: "My Events (Hosted)", href: "/dashboard" },
        { label: "Create Event", href: "/createEvent" },
        { label: "Profile", href: `/profile` },
      ];
    }

    if (user.role === "admin") {
      return [
        { label: "Admin Dashboard", href: "/admin" },
        { label: "Manage Users", href: "/admin/users" },
        { label: "Manage Hosts", href: "/admin/hosts" },
        { label: "Manage Events", href: "/admin/events" },
        { label: "Profile", href: `/profile` },
      ];
    }

    return [];
  };

  const links = getLinks();

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
            {links.map((link) => (
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

        {/* Right Buttons */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-sm border rounded hover:bg-gray-100">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <>
                <Link href="/login">
                  <button className="w-full px-4 py-2 border rounded hover:bg-gray-100">
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
