import {NextResponse} from "next/server";

export async function POST(request: Request, { params }: { params: { quizId: string } }) {
    const body = await request.json();
    const res = await fetch(`${process.env.API_URL}/api/quiz/${params.quizId}/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    // TODO: 2023-08-05 현재 500 에러상태이기 때문에 정적 데이터를 임시로 반환함
    if(res.ok) {
        const data = await res.json();
        return NextResponse.json({data});
    } else {
        throw new Error(res.statusText);
    }

}