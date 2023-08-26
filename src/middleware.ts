import { withAuth } from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    function middleware(request) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-pathname", request.nextUrl.pathname);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    },
    {
        pages: {
            signIn: "/auth/login",
        },
    }
);


export const config = {
    matcher: ["/curriculum/:path*"]
}