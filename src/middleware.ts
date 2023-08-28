import { withAuth } from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth({
    pages: {
        signIn: "/auth/login",
    },
});


export const config = {
    matcher: [
        "/curriculum/:path*",
        "/ranking/:path*",
        "/create/:path*",
        "/profile/:path*"
    ]
}