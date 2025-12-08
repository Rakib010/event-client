
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

interface LoginResponse {
    success: boolean;
    message?: string;
    user?: any;
}

export async function loginAction(
    preState: any,
    fromData: any
): Promise<LoginResponse> {
    try {
        const email = fromData.get("email");
        const password = fromData.get("password");

        if (!email || !password) {
            return { success: false, message: "Email and password are required" };
        }

        const response = await fetch(`${process.env.serverUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result?.message || "Login failed",
            };
        }

        const { accessToken, refreshToken } = result.data;

        if (!accessToken || !refreshToken) {
            return {
                success: false,
                message: "Server error: tokens missing",
            };
        }

        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        return {
            success: true,
            message: "Logged in successfully",
        };
    } catch (error) {
        console.log(error)
        return { success: false, message: "An unexpected error occurred" };
    }
}
