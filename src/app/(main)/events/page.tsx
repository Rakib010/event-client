"use client";

import { useState, useEffect } from "react";
import { eventApi } from "@/services/api";
import { IEvent, EventFilters } from "@/types";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";

const EVENT_TYPES = [
    "All",
    "Concert",
    "Sports",
    "Hiking",
    "Gaming",
    "Tech Meetup",
    "Dinner",
    "Art Exhibition",
    "Workshop",
    "Other",
];

export default function EventsPage() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<EventFilters>({
        search: "",
        type: "All",
        location: "",
    });

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            applyFilters();
        }
    }, [filters, events]);

    const loadEvents = async () => {
        try {
            const response = await eventApi.getAllEvents();
            const eventsData = response.data || [];
            setEvents(eventsData);
            setFilteredEvents(eventsData);
        } catch (err) {
            console.error("Failed to load events");
            setEvents([]);
            setFilteredEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        if (!Array.isArray(events)) {
            setFilteredEvents([]);
            return;
        }

        let filtered = [...events];

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(
                (event) =>
                    event.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
                    event.description
                        .toLowerCase()
                        .includes(filters.search!.toLowerCase())
            );
        }

        // Type filter
        if (filters.type && filters.type !== "All") {
            filtered = filtered.filter((event) => event.type === filters.type);
        }

        // Location filter
        if (filters.location) {
            filtered = filtered.filter((event) =>
                event.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    const handleTypeChange = (value: string) => {
        setFilters((prev) => ({ ...prev, type: value }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, location: e.target.value }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading events...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 my-10">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Events</h1>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Search</label>
                        <Input
                            type="text"
                            placeholder="Search events..."
                            value={filters.search}
                            onChange={handleSearchChange}
                            className="w-full"
                        />
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Event Type</label>
                        <Select value={filters.type} onValueChange={handleTypeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                                {EVENT_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input
                            type="text"
                            placeholder="Filter by location..."
                            value={filters.location}
                            onChange={handleLocationChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                Found {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            </p>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No events found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Link
                            key={event._id}
                            href={`/event/${event._id}`}
                            className="group"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                {/* Event Image */}
                                {event.profileImage ? (
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={event.profileImage}
                                            alt={event.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <p className="text-white text-2xl font-bold">
                                            {event.name.charAt(0)}
                                        </p>
                                    </div>
                                )}

                                {/* Event Info */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {event.name}
                                        </h3>
                                        <Badge
                                            variant={
                                                event.status === "open" ? "success" : "secondary"
                                            }
                                        >
                                            {event.status}
                                        </Badge>
                                    </div>

                                    <Badge className="mb-3">{event.type}</Badge>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>
                                                {event.participants.length}/{event.maxParticipants}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="font-semibold text-green-600">
                                                ${event.joiningFee}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
