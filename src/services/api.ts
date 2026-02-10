import { api } from "@/lib/axios";
import {
    RegisterFormData,
    LoginFormData,
    EventFormData,
    ProfileFormData,
    ReviewFormData,
    IUser,
    IEvent,
    IReview,
} from "@/types";

// ==================== AUTH APIs ====================
export const authApi = {
    register: async (data: RegisterFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.phone) formData.append("phone", data.phone);
        if (data.location) formData.append("location", data.location);
        if (data.file) formData.append("file", data.file);

        return api.post("/auth/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    login: async (data: LoginFormData) => {
        return api.post("/auth/login", data);
    },

    logout: async () => {
        return api.post("/auth/logout");
    },

    refreshToken: async () => {
        return api.post("/auth/refresh-token");
    },
};

// ==================== USER APIs ====================
export const userApi = {
    getMe: async () => {
        return api.get<IUser>("/user/get-me");
    },

    updateProfile: async (id: string, data: ProfileFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.phone) formData.append("phone", data.phone);
        if (data.location) formData.append("location", data.location);
        if (data.bio) formData.append("bio", data.bio);
        if (data.interests) {
            data.interests.forEach((interest) => {
                formData.append("interests[]", interest);
            });
        }
        if (data.file) formData.append("file", data.file);

        return api.patch(`/user/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    getAllUsers: async () => {
        return api.get<IUser[]>("/user");
    },

    getUserById: async (id: string) => {
        return api.get<IUser>(`/user/${id}`);
    },

    deleteUser: async (id: string) => {
        return api.delete(`/user/${id}`);
    },

    requestHost: async () => {
        return api.post("/user/request-host");
    },

    getRoleRequests: async () => {
        return api.get("/user/role-requests");
    },

    updateRoleRequest: async (id: string, action: "approve" | "reject") => {
        return api.patch(`/user/role-requests/${id}`, { action });
    },
};

// ==================== EVENT APIs ====================
export const eventApi = {
    createEvent: async (data: EventFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("date", data.date);
        formData.append("time", data.time);
        formData.append("location", data.location);
        formData.append("minParticipants", data.minParticipants.toString());
        formData.append("maxParticipants", data.maxParticipants.toString());
        formData.append("description", data.description);
        formData.append("joiningFee", data.joiningFee.toString());
        if (data.file) formData.append("file", data.file);

        return api.post("/events", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    updateEvent: async (id: string, data: EventFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("type", data.type);
        formData.append("date", data.date);
        formData.append("time", data.time);
        formData.append("location", data.location);
        formData.append("minParticipants", data.minParticipants.toString());
        formData.append("maxParticipants", data.maxParticipants.toString());
        formData.append("description", data.description);
        formData.append("joiningFee", data.joiningFee.toString());
        if (data.file) formData.append("file", data.file);

        return api.patch(`/events/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    getAllEvents: async () => {
        return api.get<IEvent[]>("/events/all-events");
    },

    getEventById: async (id: string) => {
        return api.get<IEvent>(`/events/${id}`);
    },

    deleteEvent: async (id: string) => {
        return api.get(`/events/delete-events/${id}`);
    },

    joinEvent: async (eventId: string) => {
        return api.post(`/events/join/${eventId}`);
    },

    getParticipants: async (id: string) => {
        return api.get<IUser[]>(`/events/participants/${id}`);
    },
};

// ==================== REVIEW APIs ====================
export const reviewApi = {
    createReview: async (
        hostId: string,
        eventId: string,
        data: ReviewFormData
    ) => {
        return api.post("/reviews", {
            host: hostId,
            event: eventId,
            rating: data.rating,
            comment: data.comment,
        });
    },

    getReviewsByHost: async (hostId: string) => {
        return api.get<IReview[]>(`/reviews/host/${hostId}`);
    },

    getReviewsByEvent: async (eventId: string) => {
        return api.get<IReview[]>(`/reviews/event/${eventId}`);
    },
};
