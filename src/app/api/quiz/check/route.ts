import {NextResponse} from "next/server";

export async function POST(request: Request) {
    // const body = await request.json();
    // const res = await fetch(`${process.env.API_URL}/api/quiz/check`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body)
    // })

    // TODO: 2023-08-05 현재 500 에러상태이기 때문에 정적 데이터를 임시로 반환함
    return NextResponse.json({
        answer: 1,
        solution: "임시 해설입니다. TODO: 2023-08-05 현재 500 에러상태이기 때문에 정적 데이터를 임시로 반환함"
    })
}