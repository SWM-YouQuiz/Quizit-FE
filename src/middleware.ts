import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/curriculum", request.url));
    }

    if (!request.cookies.has("refreshToken")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
};

export const config = {
    matcher: ["/curriculum/:path*", "/ranking/:path*", "/create/:path*", "/profile/:path*", "/onboarding/:path*", "/quiz/:path*", "/"],
};

export const matcher = ["/curriculum/:path*", "/ranking/:path*", "/create/:path*", "/profile/:path*", "/onboarding/:path*", "/"];
