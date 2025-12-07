"use client";

import { MapPin, Users } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface EventCardProps {
  event: any; // Using any for simplicity with mock data
}
export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-teal-700 shadow-sm"
          >
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge
            variant={event.status === "open" ? "success" : "error"}
            className="bg-white/90 backdrop-blur-sm shadow-sm"
          >
            {event.status === "open" ? "Open" : "Full"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs font-semibold text-coral-500 uppercase tracking-wide mb-1">
              {format(parseISO(event.date), "EEE, MMM d")} • {event.time}
            </p>
            <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-coral-500 transition-colors">
              {event.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {event.participants} / {event.maxParticipants} joined
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar src={event.host.avatar} size="sm" />
            <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
              {event.host.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-slate-900">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
