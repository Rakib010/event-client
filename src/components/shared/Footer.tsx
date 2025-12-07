import React from "react";
import {
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EventMates</span>
            </Link>

            <p className="text-sm text-slate-400 max-w-xs">
              Connect with like-minded people, discover local events, and create
              unforgettable memories together.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-sm hover:text-orange-400">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/hosts" className="text-sm hover:text-orange-400">
                  Find Hosts
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm hover:text-orange-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-orange-400">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-orange-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm hover:text-orange-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-orange-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-orange-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-sm hover:text-orange-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm hover:text-orange-400">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-orange-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-orange-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EventMates Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-slate-500 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
