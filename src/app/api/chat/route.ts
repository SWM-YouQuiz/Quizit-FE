import {NextRequest} from "next/server";
import {OpenAIStream, StreamingTextResponse} from "ai";
import {makeQAChain} from "@/lib/langchain/QAChain";
import {getMemory} from "@/lib/langchain/utils";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages, chapterId, question: quizQuestion, options, answer, choice } = body;
    const { memory, question } = getMemory(messages);

    const {callChain} = makeQAChain({
        messages,
        question,
        chapterId,
        quizQuestion,
        options,
        answer,
        choice
    });

    const stream = await callChain();

    return new StreamingTextResponse(stream);
}