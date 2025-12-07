"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EventCard } from "./EventCard";
import { events } from "@/utils/mockData";
export function EventsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Upcoming Adventures
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join these popular events happening near you
            </p>
          </div>
          <Link href="/events" className="hidden sm:block">
            <Button
              variant="ghost"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              View all events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link href="/events">
            <Button variant="outline" className="w-full">
              View all events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
