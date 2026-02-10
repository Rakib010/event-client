"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { eventApi, userApi } from "@/services/api";
import { IEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      loadEvents();
    }
  }, [user, loading, router]);

  const loadEvents = async () => {
    try {
      const response = await eventApi.getAllEvents();
      setEvents(response.data);
    } catch (err) {
      console.error("Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleRequestHost = async () => {
    try {
      await userApi.requestHost();
      alert("Host request submitted! Admin will review your request.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit request");
    }
  };

  if (loading || loadingEvents) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Filter events based on user role
  const myEvents =
    user.role === "host"
      ? events.filter((e) => typeof e.host === "string" && e.host === user.userId)
      : events.filter((e) =>
        e.participants.some((p) => typeof p === "string" && p === user.userId)
      );

  const upcomingEvents = myEvents.filter(
    (e) => new Date(e.date) >= new Date() && e.status === "open"
  );
  const pastEvents = myEvents.filter(
    (e) => new Date(e.date) < new Date() || e.status === "completed"
  );

  const totalRevenue =
    user.role === "host"
      ? myEvents.reduce((sum, event) => {
        return sum + event.joiningFee * event.participants.length;
      }, 0)
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 my-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {user.role === "host" ? "Host Dashboard" : "My Dashboard"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user.email}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Upcoming Events
          </h3>
          <p className="text-3xl font-bold">{upcomingEvents.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
            Past Events
          </h3>
          <p className="text-3xl font-bold">{pastEvents.length}</p>
        </div>
        {user.role === "host" && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Request Host Button for Users */}
      {user.role === "user" && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Want to host events?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Request to become a host and start creating your own events!
          </p>
          <Button onClick={handleRequestHost}>Request Host Access</Button>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events</p>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Link
                key={event._id}
                href={`/event/${event._id}`}
                className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <Badge>{event.type}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.participants.length}/{event.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${event.joiningFee}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        {pastEvents.length === 0 ? (
          <p className="text-gray-500">No past events</p>
        ) : (
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <Link
                key={event._id}
                href={`/event/${event._id}`}
                className="block border rounded-lg p-4 hover:shadow-md transition-shadow opacity-75"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <Badge variant="secondary">{event.status}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.participants.length}/{event.maxParticipants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${event.joiningFee}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}