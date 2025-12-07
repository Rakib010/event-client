"use client";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: any;
}
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-8 h-full bg-slate-50 border-none">
      <Quote className="h-8 w-8 text-coral-200 mb-4" />
      <p className="text-lg text-slate-700 mb-6 italic">
        {testimonial.content}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-3">
          <Avatar src={testimonial.avatar} size="md" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {testimonial.user}
            </h4>
            <p className="text-xs text-slate-500">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-current"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
