"use client"
import { useUser } from "@/hooks/useUser";

export const useLinks = () => {
    const { user, reload } = useUser();

    if (!user)
        return [
            { label: "Home", href: "/" },
            { label: "Explore Events", href: "/event" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Become a Host", href: "/becomeHost" },
        ];

    switch (user.role) {
        case "user":
            return [
                { label: "Home", href: "/" },
                { label: "Explore Events", href: "/event" },
                { label: "My Events", href: "/dashboard" },
                { label: "Profile", href: `/profile/${user.userId}` },
            ];
        case "host":
            return [
                { label: "Home", href: "/" },
                { label: "Explore Events", href: "/event" },
                { label: "My Events (Hosted)", href: "/dashboard" },
                { label: "Create Event", href: "/event/createEvent" },
                { label: "Profile", href: `/profile/${user.userId}` },
            ];
        case "admin":
            return [{ label: "Admin Dashboard", href: "/dashboard" }];
        default:
            return [];
    }
};