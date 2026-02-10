"use client";

import { useState, useEffect } from "react";
import { userApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoleRequest {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    status: string;
    createdAt: string;
}

export default function AdminHostsPage() {
    const [requests, setRequests] = useState<RoleRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const response = await userApi.getRoleRequests();
            setRequests(response.data);
        } catch (err) {
            console.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRequest = async (id: string, action: "approve" | "reject") => {
        try {
            await userApi.updateRoleRequest(id, action);
            loadRequests();
        } catch (err) {
            alert("Failed to update request");
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
            <h1 className="text-4xl font-bold mb-8">Manage Host Requests</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No pending host requests
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{request.user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{request.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={request.status === "pending" ? "warning" : "secondary"}>
                                            {request.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(request.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {request.status === "pending" && (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => handleUpdateRequest(request._id, "approve")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleUpdateRequest(request._id, "reject")}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
