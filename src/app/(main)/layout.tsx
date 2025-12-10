import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <body className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content automatically grows */}
      <main className="flex-1">{children}</main>

      <Footer />
    </body>
  );
}
