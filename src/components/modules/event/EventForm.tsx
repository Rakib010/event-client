"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { eventApi } from "@/services/api";
import { useRouter } from "next/navigation";
import { EventFormData, IEvent } from "@/types";
import Image from "next/image";

interface EventFormProps {
    event?: IEvent;
    isEdit?: boolean;
}

const EVENT_TYPES = [
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

const EventForm = ({ event, isEdit = false }: EventFormProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState<EventFormData>({
        name: event?.name || "",
        type: event?.type || "",
        date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "",
        time: event?.time || "",
        location: event?.location || "",
        minParticipants: event?.minParticipants || 2,
        maxParticipants: event?.maxParticipants || 10,
        description: event?.description || "",
        joiningFee: event?.joiningFee || 0,
    });

    const [imagePreview, setImagePreview] = useState<string>(
        event?.profileImage || ""
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, type: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isEdit && event?._id) {
                await eventApi.updateEvent(event._id, formData);
                router.push(`/event/${event._id}`);
            } else {
                const response = await eventApi.createEvent(formData);
                router.push("/events");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md my-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                {isEdit ? "Edit Event" : "Create New Event"}
            </h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <FieldGroup className="space-y-4">
                    {/* Event Image */}
                    <Field>
                        <FieldLabel htmlFor="image">Event Image</FieldLabel>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="bg-gray-100 dark:bg-slate-700"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-2 flex justify-center">
                                <Image
                                    src={imagePreview}
                                    alt="Event Preview"
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        )}
                    </Field>

                    {/* Event Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Event Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Summer Music Festival"
                            className="bg-gray-100 dark:bg-slate-700"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Event Type */}
                    <Field>
                        <FieldLabel htmlFor="type">Event Type</FieldLabel>
                        <Select value={formData.type} onValueChange={handleSelectChange}>
                            <SelectTrigger className="bg-gray-100 dark:bg-slate-700">
                                <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                                {EVENT_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="date">Date</FieldLabel>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                className="bg-gray-100 dark:bg-slate-700"
                                required
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="time">Time</FieldLabel>
                            <Input
                                id="time"
                                name="time"
                                type="time"
                                className="bg-gray-100 dark:bg-slate-700"
                                required
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </Field>
                    </div>

                    {/* Location */}
                    <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Central Park, New York"
                            className="bg-gray-100 dark:bg-slate-700"
                            required
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Participants */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="minParticipants">
                                Min Participants
                            </FieldLabel>
                            <Input
                                id="minParticipants"
                                name="minParticipants"
                                type="number"
                                min="1"
                                className="bg-gray-100 dark:bg-slate-700"
                                required
                                value={formData.minParticipants}
                                onChange={handleNumberChange}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="maxParticipants">
                                Max Participants
                            </FieldLabel>
                            <Input
                                id="maxParticipants"
                                name="maxParticipants"
                                type="number"
                                min="1"
                                className="bg-gray-100 dark:bg-slate-700"
                                required
                                value={formData.maxParticipants}
                                onChange={handleNumberChange}
                            />
                        </Field>
                    </div>

                    {/* Joining Fee */}
                    <Field>
                        <FieldLabel htmlFor="joiningFee">Joining Fee ($)</FieldLabel>
                        <Input
                            id="joiningFee"
                            name="joiningFee"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-gray-100 dark:bg-slate-700"
                            required
                            value={formData.joiningFee}
                            onChange={handleNumberChange}
                        />
                    </Field>

                    {/* Description */}
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Tell us about your event..."
                            className="bg-gray-100 dark:bg-slate-700 min-h-[120px]"
                            required
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Submit Button */}
                    <Field className="mt-6">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Event"
                                    : "Create Event"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default EventForm;
