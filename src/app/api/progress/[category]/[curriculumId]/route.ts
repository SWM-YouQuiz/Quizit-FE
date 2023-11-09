import { NextRequest, NextResponse } from "next/server";

type Params = { curriculumId: string; category: "curriculum" | "course" | "chapter" };

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const headersList = request.headers;
    const token = headersList.get("Authorization") as string;

    const res = await fetch(`${process.env.API_URL}/api/${params.category}/${params.curriculumId}/progress`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });

    const data = await res.json();

    return NextResponse.json(data);
}
