"use client";

import React, { useContext, useEffect, useRef } from "react";
import { UseChatHelpers } from "ai/react";
import { useMessageToHtmlString } from "@/modules/quiz/hooks/useRemark";
import { Message } from "ai";
import Image from "next/image";
import { motion } from "framer-motion";
import { QuizContext } from "@/lib/context/Context";

const systemPrompt = `
당신은 퀴즈에 대한 해설을 해주는 역할입니다.
`;

const userPrompt = `
아래 퀴즈에 대한 해설을 부탁합니다.
그리고 이전 대화 내용을 묻는 질문에 대한 대답을 피해주세요.
`;
const invisibleMessageId = "invisible";
const isInvisibleMessage = (id: string) => id === invisibleMessageId;

type ExplanationComponentProps = {
    quizHtml: Quiz;
    answer: number;
    solution: string;
    select: number;
    chat: UseChatHelpers;
};

const image = "https://quizit-storage.s3.ap-northeast-2.amazonaws.com/character1.svg";

const ExplanationComponent = ({ quizHtml, answer, solution, select, chat }: ExplanationComponentProps) => {
    const { id: quizId, question, options: quizOptions } = quizHtml;
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = chat;

    const makeUserPrompt = (question: string, answer: number) => {
        return `
        ${userPrompt}
        문제: ${question}
        문항들: ${JSON.stringify(quizOptions)}
        정답: ${quizOptions[answer]}
        사용자의 선택: ${quizOptions[select]}
    `;
    };

    const convertedMessages = useMessageToHtmlString(messages, isLoading);

    return <MessageBlockes convertedMessages={convertedMessages} isLoading={isLoading} error={error} />;
};

const MessageBlockes = ({ convertedMessages, isLoading, error }: { convertedMessages: Message[]; isLoading: boolean; error?: Error }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) ref.current.scrollIntoView({ behavior: "instant" });
    }, [convertedMessages]);

    return (
        <div className="flex flex-col space-y-2.5 overflow-y-auto overflow-x-hidden">
            {convertedMessages.map((message) => !isInvisibleMessage(message.id) && <MessageBlock key={message.id} message={message} />)}
            {error && <ErrorMessage />}
            <div ref={ref} />
        </div>
    );
};

const ErrorMessage = () => (
    <div className="flex space-x-2">
        <div className="flex flex-col justify-start w-[28px]">
            <div className="border border-neutral-100 rounded-full">
                <Image src={image} width={30} height={30} alt={"profileImage"} />
            </div>
        </div>
        <div className="flex-1 bg-bg-primary rounded-b-xl rounded-tr-xl p-2.5">
            <div className="text-xs text-secondary-800">요청이 너무 많습니다. 잠시 후 다시 시도해주세요.</div>
        </div>
    </div>
);

const MessageBlock = ({ message }: { message: Message }) => {
    const { user } = useContext(QuizContext);

    const userImage = user === undefined || user.image === "" ? image : user.image;

    if (message.role === "user") {
        return (
            <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ delay: 0.2 }}
                className="flex self-end space-x-2"
            >
                <div className="flex-1 bg-primary-50 rounded-b-xl rounded-tl-xl p-2.5">
                    <div className="text-xs text-secondary-800 break-all" dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
                <div className="flex flex-col justify-start w-[28px]">
                    <div className="border border-neutral-100 rounded-full">
                        <Image src={userImage} width={30} height={30} alt={"퀴즈보"} />
                    </div>
                </div>
            </motion.div>
        );
    } else {
        return (
            <div className="flex space-x-2">
                <div className="flex flex-col justify-start w-[28px]">
                    <div className="border border-neutral-100 rounded-full">
                        <Image src={image} width={30} height={30} alt={"profileImage"} />
                    </div>
                </div>
                <div className="flex-1 bg-bg-primary rounded-b-xl rounded-tr-xl p-2.5">
                    <div className="text-xs text-secondary-800" dangerouslySetInnerHTML={{ __html: message.content }} />
                </div>
            </div>
        );
    }
};

export default ExplanationComponent;
