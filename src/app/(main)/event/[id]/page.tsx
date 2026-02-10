"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventApi, reviewApi } from "@/services/api";
import { IEvent, IUser, IReview } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { useUser } from "@/hooks/useUser";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Star,
} from "lucide-react";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvent();
    loadReviews();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      const response = await eventApi.getEventById(params.id as string);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewApi.getReviewsByEvent(params.id as string);
      setReviews(response.data);
    } catch (err) {
      console.error("Failed to load reviews");
    }
  };

  const handleJoinEvent = async () => {
    if (!event) return;
    setJoining(true);
    try {
      await eventApi.joinEvent(event._id);
      loadEvent(); // Reload to update participants
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to join event");
    } finally {
      setJoining(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!event || !confirm("Are you sure you want to delete this event?"))
      return;
    try {
      await eventApi.deleteEvent(event._id);
      router.push("/events");
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

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Event not found</p>
      </div>
    );
  }

  const isHost =
    user &&
    typeof event.host === "object" &&
    event.host._id === user.userId;
  const isParticipant =
    user && event.participants.some((p) => typeof p === "string" && p === user.userId);
  const hostData = typeof event.host === "object" ? event.host : null;

  return (
    <div className="max-w-5xl mx-auto p-6 my-10">
      {/* Event Image */}
      {event.profileImage && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-6">
          <Image
            src={event.profileImage}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Event Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
            <Badge variant={event.status === "open" ? "success" : "secondary"}>
              {event.status.toUpperCase()}
            </Badge>
          </div>
          {isHost && (
            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/events/edit/${event._id}`)}
                variant="outline"
              >
                Edit
              </Button>
              <Button onClick={handleDeleteEvent} variant="destructive">
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <span>
              {event.participants.length} / {event.maxParticipants} participants
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-500" />
            <span>${event.joiningFee}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{event.type}</Badge>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">About this event</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        {/* Join Button */}
        {user && user.role === "user" && !isParticipant && (
          <Button
            onClick={handleJoinEvent}
            disabled={joining || event.status !== "open"}
            className="w-full mt-6"
          >
            {joining ? "Joining..." : `Join Event - $${event.joiningFee}`}
          </Button>
        )}

        {isParticipant && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              You're attending this event!
            </p>
          </div>
        )}
      </div>

      {/* Host Info */}
      {hostData && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
          <div className="flex items-center gap-4">
            {hostData.profileImage && (
              <Image
                src={hostData.profileImage}
                alt={hostData.name}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-lg">{hostData.name}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {hostData.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => {
              const reviewer =
                typeof review.user === "object" ? review.user : null;
              return (
                <div
                  key={review._id}
                  className="border-b pb-4 last:border-b-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold">
                      {reviewer?.name || "Anonymous"}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}