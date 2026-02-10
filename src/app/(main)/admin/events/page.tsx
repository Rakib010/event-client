"use client";

import { useState, useEffect } from "react";
import { eventApi } from "@/services/api";
import { IEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function AdminEventsPage() {
    const router = useRouter();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const response = await eventApi.getAllEvents();
            setEvents(response.data);
        } catch (err) {
            console.error("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            await eventApi.deleteEvent(id);
            loadEvents();
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 my-10">
            <h1 className="text-4xl font-bold mb-8">Manage Events</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Event Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Participants
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium">{event.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge>{event.type}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {format(new Date(event.date), "MMM dd, yyyy")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={event.status === "open" ? "success" : "secondary"}>
                                        {event.status.toUpperCase()}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {event.participants.length}/{event.maxParticipants}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(`/event/${event._id}`)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteEvent(event._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
