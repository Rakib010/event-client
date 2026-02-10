"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reviewApi } from "@/services/api";
import { Star } from "lucide-react";

interface ReviewFormProps {
    hostId: string;
    eventId: string;
    onSuccess?: () => void;
}

export default function ReviewForm({ hostId, eventId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await reviewApi.createReview(hostId, eventId, { rating, comment });
            setRating(0);
            setComment("");
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating */}
                <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${star <= (hoveredRating || rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-2">
                        Comment (Optional)
                    </label>
                    <Textarea
                        id="comment"
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : "Submit Review"}
                </Button>
            </form>
        </div>
    );
}
