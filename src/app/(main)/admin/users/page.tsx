"use client";

import { useState, useEffect } from "react";
import { userApi } from "@/services/api";
import { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await userApi.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await userApi.deleteUser(id);
            loadUsers();
        } catch (err) {
            alert("Failed to delete user");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 my-10">
            <h1 className="text-4xl font-bold mb-8">Manage Users</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-medium">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                                        {user.role.toUpperCase()}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {user.location || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(`/profile/${user._id}`)}
                                        >
                                            View
                                        </Button>
                                        {user.role !== "admin" && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
