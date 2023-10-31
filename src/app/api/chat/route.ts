import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";
import { makeQAChain } from "@/lib/langchain/QAChain";
import { getMemory } from "@/lib/langchain/utils";
import { limiter } from "@/app/api/config/limiter";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages, chapterId, question: quizQuestion, options, answer, choice } = body;
    const { memory, question } = getMemory(messages);
    const remaining = await limiter.removeTokens(1);

    if (remaining < 0) {
        return new NextResponse(null, {
            status: 429,
            statusText: "Too many Requests",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
    try {
        const { callChain } = makeQAChain({
            messages,
            question,
            chapterId,
            quizQuestion,
            options,
            answer,
            choice,
        });
        const stream = await callChain();
        return new StreamingTextResponse(stream);
    } catch {
        return new NextResponse(null, {
            status: 500,
            statusText: "Unexpected Error",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
}
