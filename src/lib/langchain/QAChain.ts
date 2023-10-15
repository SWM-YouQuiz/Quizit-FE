import {LangChainStream, Message} from "ai";
import {ZepVectorStore} from "langchain/vectorstores/zep";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {PromptTemplate} from "langchain/prompts";
import {ConversationalRetrievalQAChain} from "langchain/chains";
import {BufferMemory} from "langchain/memory";

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.
Chat History:
{chat_history}
Follow Up Input: {question}
Your answer should follow the following format:
\`\`\`
Use the following pieces of context to answer the users question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
<Relevant chat history excerpt as context here>
Standalone question: <Rephrased question here>
\`\`\`
Your answer:`;

const template = `You are a chatbot helping customers with their questions in korean. 친절하게 답변해주세요.
  
  {context}
  
  Human: {question}
  Assistant:
  `;

export const makeQAChain = ({memory, question, chapterId}: {memory: BufferMemory, question: string, chapterId: string}) => {
    const {
        stream,
        handlers: {
            handleChainEnd,
            handleLLMStart,
            handleLLMNewToken,
            handleLLMError,
            handleChainStart,
            handleChainError,
            handleToolStart,
            handleToolError,
        },
    } = LangChainStream();

    const collectionName = chapterId;

    const zepConfig = {
        apiUrl: process.env.ZEP_URL as string, // the URL of your Zep implementation
        collectionName,  // the name of your collection. alphanum values only
    };

    const vectorDB = new ZepVectorStore(
        new OpenAIEmbeddings(),
        zepConfig
    );
    let id = "";

    const handlers = {
        handleLLMStart: (llm: any, prompts: string[], runId: string) => {
            id = runId;
            return handleLLMStart(llm, prompts, runId);
        },
        handleLLMNewToken,
        handleLLMError,
        handleChainStart,
        handleChainError,
        handleToolStart,
        handleToolError,
    };

    const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo-16k",
        streaming: true,
        temperature: 1,
        callbacks: [handlers],
    });
    const nonStreamingModel = new ChatOpenAI({});

    const prompt = new PromptTemplate({
        template,
        inputVariables: ["question", "context"],
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
        llm,
        vectorDB.asRetriever(),
        {
            memory,
            returnSourceDocuments: true,
            qaChainOptions: {
                type: "stuff",
                prompt: prompt,
            },
            questionGeneratorChainOptions: {
                llm: nonStreamingModel,
                template: CONDENSE_QUESTION_TEMPLATE,
            },
        }
    );

    const callChain = () => {
        chain.call({ question }).then(async (response) => {
            const sources = JSON.stringify(
                response.sourceDocuments.map((document: any) => document.metadata.source)
            );
            await handleLLMNewToken(`##SOURCE_DOCUMENTS##${sources}`);
            await handleChainEnd(null, id);
        });
    }

    return {callChain, stream};
}