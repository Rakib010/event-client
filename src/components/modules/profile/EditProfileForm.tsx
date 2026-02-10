"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { userApi } from "@/services/api";
import { useRouter } from "next/navigation";
import { ProfileFormData, IUser } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";

interface EditProfileFormProps {
    user: IUser;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState<ProfileFormData>({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        interests: user.interests || [],
    });

    const [newInterest, setNewInterest] = useState("");
    const [imagePreview, setImagePreview] = useState<string>(
        user.profileImage || ""
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleAddInterest = () => {
        if (newInterest.trim() && !formData.interests?.includes(newInterest.trim())) {
            setFormData((prev) => ({
                ...prev,
                interests: [...(prev.interests || []), newInterest.trim()],
            }));
            setNewInterest("");
        }
    };

    const handleRemoveInterest = (interest: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests?.filter((i) => i !== interest) || [],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await userApi.updateProfile(user._id, formData);
            router.push("/profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md my-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <FieldGroup className="space-y-4">
                    {/* Profile Image */}
                    <Field>
                        <FieldLabel htmlFor="image">Profile Image</FieldLabel>
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
                                    alt="Preview"
                                    width={120}
                                    height={120}
                                    className="rounded-full object-cover"
                                />
                            </div>
                        )}
                    </Field>

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            className="bg-gray-100 dark:bg-slate-700"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Phone */}
                    <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1234567890"
                            className="bg-gray-100 dark:bg-slate-700"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Location */}
                    <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="New York, USA"
                            className="bg-gray-100 dark:bg-slate-700"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Bio */}
                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us about yourself..."
                            className="bg-gray-100 dark:bg-slate-700 min-h-[100px]"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Interests */}
                    <Field>
                        <FieldLabel>Interests</FieldLabel>
                        <div className="flex gap-2 mb-2">
                            <Input
                                type="text"
                                placeholder="Add an interest"
                                className="bg-gray-100 dark:bg-slate-700"
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddInterest();
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={handleAddInterest}
                                variant="outline"
                            >
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.interests?.map((interest) => (
                                <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                                    {interest}
                                    <X
                                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                                        onClick={() => handleRemoveInterest(interest)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    </Field>

                    {/* Submit Button */}
                    <Field className="mt-6">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default EditProfileForm;
