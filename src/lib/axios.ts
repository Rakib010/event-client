/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Auto-refresh interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
    failedQueue = [];
};

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;

        if (err.response?.status === 401 && !original._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(original));
            }

            original._retry = true;
            isRefreshing = true;

            try {
                await api.post("/auth/refresh-token"); // backend sets new accessToken cookie
                isRefreshing = false;
                processQueue(null, true);
                return api(original);
            } catch (error) {
                isRefreshing = false;
                processQueue(error, null);
                if (typeof window !== "undefined") window.location.href = "/login";
            }
        }

        return Promise.reject(err);
    }
);
