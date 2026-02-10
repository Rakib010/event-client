"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import Link from "next/link";
import { Users, Calendar, Shield } from "lucide-react";

export default function AdminDashboardPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== "admin")) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 my-10">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/users"
                    className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">Users</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage all users on the platform
                    </p>
                </Link>

                <Link
                    href="/admin/hosts"
                    className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">Hosts</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage host role requests
                    </p>
                </Link>

                <Link
                    href="/admin/events"
                    className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">Events</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage all events on the platform
                    </p>
                </Link>
            </div>
        </div>
    );
}
