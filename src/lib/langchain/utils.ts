"use server"
import {
    HumanMessage, AIMessage,
} from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import {BaseMessage} from "langchain/schema";
import {Message} from "ai";

const getChatMessages = (history: Message[]): BaseMessage[] => {
    return history.map((message) =>
        message.role === "user"
            ? new HumanMessage(message.content)
            : new AIMessage(message.content)
    );
};

const extractLastQuestion = (messages: Message[]) => {
    const question =
        messages.length > 0 ? messages[messages.length - 1].content : "";
    const previousMessages = messages.slice(0, messages.length - 1);

    return { question, previousMessages };
};

const getMemory = (messages: Message[]) => {
    const { question, previousMessages } = extractLastQuestion(messages);

    const messageHistory = getChatMessages(previousMessages);

    const memory = new BufferMemory({
        memoryKey: "chat_history",
        inputKey: "question",
        chatHistory: new ChatMessageHistory(messageHistory),
    });

    return { memory, question };
};

export { getMemory };