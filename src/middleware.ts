import { withAuth } from "next-auth/middleware";
import {NextRequest, NextResponse} from "next/server";

export default withAuth(
    function middleware(request: NextRequest) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/curriculum', request.url))
        }
    },
    {
    pages: {
        signIn: "/auth/login",
    },
});


export const config = {
    matcher: [
        "/curriculum/:path*",
        "/ranking/:path*",
        "/create/:path*",
        "/profile/:path*",
        "/onboarding/:path*",
        "/"
    ]
}