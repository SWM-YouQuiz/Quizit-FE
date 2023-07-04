import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache' // 캐시 비활성화
        },
    })
    const data = await res.json()

    return NextResponse.json({data: data.data}, {status: data.status});
}