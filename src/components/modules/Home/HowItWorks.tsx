"use client";
import { UserPlus, Search, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create a Profile",
      description:
        "Sign up and tell us about your interests. We will recommend events tailored to you.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Search,
      title: "Discover Events",
      description:
        "Browse thousands of local activities, from casual meetups to organized adventures.",
      color: "bg-coral-100 text-coral-600",
    },
    {
      icon: CalendarCheck,
      title: "Join & Participate",
      description:
        "Book your spot, meet new people, and enjoy the experience. It is that simple!",
      color: "bg-teal-100 text-teal-600",
    },
  ];
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How EventMates Works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Start your journey in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.2,
              }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`h-24 w-24 rounded-3xl flex items-center justify-center mb-6 ${step.color} shadow-sm`}
              >
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
