"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle, Info } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

interface IEventDetails {
    _id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    location: string;
    description: string;
    profileImage: string;
    joiningFee: number;
    status: string;
    minParticipants: number;
    maxParticipants: number;
    participants: { _id: string; name: string; profileImage?: string; email: string }[];
    host: { _id: string; name: string; profileImage?: string; email: string };
}

export default function EventDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [event, setEvent] = useState<IEventDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data.data);
            } catch (error) {
                console.error("Failed to fetch event details", error);
                toast.error("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEvent();
    }, [id]);

    const handleJoinEvent = async () => {
        if (!user) {
            toast.error("Please login to join events");
            router.push("/login");
            return;
        }

        setJoining(true);
        try {
            await api.post(`/bookings`, { eventId: id });
            toast.success("Successfully joined the event!");
            // Refresh event data to show updated participants
            const res = await api.get(`/events/${id}`);
            setEvent(res.data.data);
        } catch (error: any) {
            console.error("Failed to join event", error);
            toast.error(error.response?.data?.message || "Failed to join event");
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
                <Button onClick={() => router.push("/events")} className="mt-4">
                    Back to Events
                </Button>
            </div>
        );
    }

    const isFull = event.participants.length >= event.maxParticipants;
    const isJoined = user && event.participants.some((p) => p._id === user.userId);
    const isHost = user && event.host._id === user.userId;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
                <img
                    src={event.profileImage || "/assets/event-placeholder.jpg"}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                    <Badge className={`text-lg px-4 py-1 ${event.status === 'open' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                        {event.status.toUpperCase()}
                    </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <Badge variant="outline" className="text-white border-white mb-2">
                                {event.type}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">
                                {event.name}
                            </h1>
                            <div className="flex items-center text-gray-200 gap-4">
                                <span className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" /> {event.location}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" /> {event.time}
                                </span>
                            </div>
                        </div>
                        <div className="text-white">
                            <p className="text-3xl font-bold">
                                {event.joiningFee === 0 ? "Free" : `$${event.joiningFee}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <Info className="h-5 w-5 mr-2 text-primary" /> About Event
                        </h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </p>
                    </section>

                    {/* Details Grid */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <Calendar className="h-5 w-5 text-primary mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-700">Date</p>
                                    <p className="text-gray-600">{format(parseISO(event.date), "EEEE, MMMM do, yyyy")}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Users className="h-5 w-5 text-primary mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-700">Participants</p>
                                    <p className="text-gray-600">{event.participants.length} / {event.maxParticipants} joined</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: `${Math.min((event.participants.length / event.maxParticipants) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <DollarSign className="h-5 w-5 text-primary mr-3 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-700">Entry Fee</p>
                                    <p className="text-gray-600">{event.joiningFee === 0 ? "Free Entry" : `$${event.joiningFee} per person`}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Host Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-wider mb-4">Hosted By</h3>
                        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white shadow-md">
                            <AvatarImage src={event.host.profileImage} />
                            <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h4 className="text-xl font-bold text-gray-800">{event.host.name}</h4>
                        <p className="text-gray-500 text-sm mb-4">{event.host.email}</p>
                        <Button variant="outline" className="w-full" onClick={() => router.push(`/profile/${event.host._id}`)}>
                            View Profile
                        </Button>
                    </div>

                    {/* Action Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-primary/10 sticky top-24">
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 text-center mb-1">Total Spots</p>
                            <p className="text-3xl font-bold text-center text-primary">{event.maxParticipants}</p>
                            <p className="text-xs text-center text-gray-400">{event.maxParticipants - event.participants.length} spots remaining</p>
                        </div>

                        {isHost ? (
                            <Button className="w-full" variant="secondary" onClick={() => router.push(`/events/edit/${id}`)}>
                                Edit Event
                            </Button>
                        ) : isJoined ? (
                            <Button className="w-full bg-green-600 hover:bg-green-700 cursor-default">
                                <CheckCircle className="mr-2 h-4 w-4" /> You're Going!
                            </Button>
                        ) : isFull ? (
                            <Button className="w-full" disabled>
                                Event Full
                            </Button>
                        ) : (
                            <Button
                                className="w-full text-lg py-6"
                                onClick={handleJoinEvent}
                                disabled={joining}
                            >
                                {joining ? "Joining..." : "Join Event"}
                            </Button>
                        )}
                    </div>

                    {/* Participants Preview */}
                    {event.participants.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Who's Going</h3>
                            <div className="flex -space-x-3 overflow-hidden mb-4 p-1">
                                {event.participants.slice(0, 5).map((participant) => (
                                    <Avatar key={participant._id} className="border-2 border-white w-10 h-10">
                                        <AvatarImage src={participant.profileImage} />
                                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {event.participants.length > 5 && (
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-600">
                                        +{event.participants.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
