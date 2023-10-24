import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export const GET = async (request: Request) => {
    const cookie = cookies();
    console.log("cookie", cookie);
    return new NextResponse(JSON.stringify({"success": true}))
}