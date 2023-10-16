import {NextRequest} from "next/server";
import {LangChainStream, StreamingTextResponse} from "ai";
import {makeQAChain} from "@/lib/langchain/QAChain";
import {getMemory} from "@/lib/langchain/utils";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages, chapterId } = body;
    const { memory, question } = getMemory(messages);

    const {callChain, stream} = makeQAChain({memory, question, chapterId: chapterId});

    callChain();

    return new StreamingTextResponse(stream);
}