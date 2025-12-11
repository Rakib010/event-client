import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    console.log(token);
    const path = req.nextUrl.pathname;

    if (!token) {
        // Not logged in
        if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
            userId: string;
            role: string;
        };

        const userRole = payload.role;

        // Protect dashboard
        if (path.startsWith("/dashboard") && !["user", "host", "admin"].includes(userRole)) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // Protect admin
        if (path.startsWith("/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        return NextResponse.next();
    } catch (err) {
        // Invalid token
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
