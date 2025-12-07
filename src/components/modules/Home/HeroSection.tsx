"use client";

import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-20 sm:py-32 lg:pb-32 xl:pb-36">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="People enjoying an event"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Find your people. <br />
            <span className="text-coral-500">Share the moment.</span>
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mt-6 text-lg leading-8 text-slate-300"
          >
            Discover local events, join activities, and meet like-minded people.
            From hiking trips to board game nights, never miss out on an
            experience again.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mt-10"
          >
            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="What do you want to do?"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-coral-500 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-coral-500 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <Button size="lg" className="md:w-auto w-full">
                Search
              </Button>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-slate-400">
              <span>Popular:</span>
              <button className="hover:text-white underline decoration-coral-500 underline-offset-4">
                Hiking
              </button>
              <button className="hover:text-white underline decoration-coral-500 underline-offset-4">
                Concerts
              </button>
              <button className="hover:text-white underline decoration-coral-500 underline-offset-4">
                Workshops
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
