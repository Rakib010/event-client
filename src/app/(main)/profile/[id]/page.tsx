"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { userApi, eventApi } from "@/services/api";
import { IUser, IEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Mail, Phone, MapPin, Calendar, Star } from "lucide-react";
import { format } from "date-fns";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const [profile, setProfile] = useState<IUser | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
    loadUserEvents();
  }, [params.id]);

  const loadProfile = async () => {
    try {
      const response = await userApi.getUserById(params.id as string);
      setProfile(response.data);
    } catch (err) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadUserEvents = async () => {
    try {
      const response = await eventApi.getAllEvents();
      // Filter events where user is host or participant
      const userEvents = response.data.filter(
        (event) =>
          (typeof event.host === "string" && event.host === params.id) ||
          event.participants.some((p) => typeof p === "string" && p === params.id)
      );
      setEvents(userEvents);
    } catch (err) {
      console.error("Failed to load events");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Profile not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.userId === profile._id;
  const hostedEvents = events.filter(
    (e) => typeof e.host === "string" && e.host === profile._id
  );
  const joinedEvents = events.filter((e) =>
    e.participants.some((p) => typeof p === "string" && p === profile._id)
  );

  return (
    <div className="max-w-5xl mx-auto p-6 my-10">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Profile Image */}
          {profile.profileImage ? (
            <Image
              src={profile.profileImage}
              alt={profile.name}
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <Badge variant="secondary" className="mb-2">
                  {profile.role.toUpperCase()}
                </Badge>
              </div>
              {isOwnProfile && (
                <Button onClick={() => router.push("/profile/edit")}>
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {profile.bio && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hosted Events */}
      {hostedEvents.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Hosted Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hostedEvents.map((event) => (
              <Link
                key={event._id}
                href={`/event/${event._id}`}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                </div>
                <Badge className="mt-2">{event.type}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Joined Events */}
      {joinedEvents.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Joined Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedEvents.map((event) => (
              <Link
                key={event._id}
                href={`/event/${event._id}`}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                </div>
                <Badge className="mt-2">{event.type}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}