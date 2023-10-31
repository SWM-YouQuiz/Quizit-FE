import { Message } from "ai";
import { ZepVectorStore } from "langchain/vectorstores/zep";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
import { RunnableSequence } from "langchain/schema/runnable";
import { BytesOutputParser } from "langchain/schema/output_parser";

type makeQAChainProps = {
    messages: Message[];
    question: string;
    chapterId: string;
    quizQuestion: string;
    options: string[];
    answer: string;
    choice: string;
};

const formatMessage = (message: Message) => {
    return `${message.role}: ${message.content}`;
};
export const makeQAChain = ({ messages, question, chapterId, quizQuestion, options, answer, choice }: makeQAChainProps) => {
    const quizInfo = `
        문제: ${quizQuestion}
        문항들: ${options}
        정답: ${answer}
        사용자의 선택: ${choice}`;

    const collectionName = chapterId;
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const zepConfig = {
        apiUrl: process.env.ZEP_URL as string, // the URL of your Zep implementation
        collectionName, // the name of your collection. alphanum values only
    };

    const vectorDB = new ZepVectorStore(new OpenAIEmbeddings(), zepConfig);
    let id = "";

    const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo-16k",
        streaming: true,
        temperature: 1,
    });

    const retriever = vectorDB.asRetriever();

    const serializeDocs = (docs: Array<Document>) => docs.map((doc) => doc.pageContent).join("\n\n");

    /**
     * Create a prompt template for generating an answer based on context and
     * a question.
     *
     * Chat history will be an empty string if it's the first question.
     *
     * inputVariables: ["chatHistory", "context", "question"]
     */
    const questionPrompt = PromptTemplate.fromTemplate(
        `당신은 사용자가 푼 퀴즈에 대한 해설을 해주는 역할입니다. 마지막에 다음 문맥을 사용하여 질문에 친절하게 답하세요. 답을 모른다면 답을 지어내지 마십시오.
QUIZ: {quizInfo}
----------
CONTEXT: {context}
----------
CHAT HISTORY: {chatHistory}
----------
QUESTION: {question}
----------
답변:`,
    );

    const chain = RunnableSequence.from([
        {
            question: (input: { question: string; chatHistory?: string }) => input.question,
            chatHistory: (input: { question: string; chatHistory?: string }) => input.chatHistory ?? "",
            context: async (input: { question: string; chatHistory?: string }) => {
                const relevantDocs = await retriever.getRelevantDocuments(input.question);
                const serialized = serializeDocs(relevantDocs);
                return serialized;
            },
            quizInfo: (input: { question: string; chatHistory?: string }) => quizInfo,
        },
        questionPrompt,
        llm,
        new BytesOutputParser(),
    ]);

    const callChain = async () => {
        return await chain.stream({
            chatHistory: formattedPreviousMessages.join("\n"),
            question: question,
        });
    };

    return { callChain };
};
