import {NextResponse} from "next/server";
import {authenticateSession} from "@/util/session";
import {authOptions} from "@/modules/auth/auth";
import {makeToken} from "@/util/fetcher";

export async function POST(request: Request, { params }: { params: { quizId: string } }) {
    const body = await request.json();
    const session = await authenticateSession(authOptions);
    const res = await fetch(`${process.env.API_URL}/api/quiz/${params.quizId}/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': makeToken(session.user.accessToken)
        },
        body: JSON.stringify(body)
    })

    return res;

}