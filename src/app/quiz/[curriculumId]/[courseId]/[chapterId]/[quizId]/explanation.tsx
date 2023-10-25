"use client"

import React, {useEffect, useRef, useState} from "react";
import {useChat} from "ai/react";
import {useMessageToHtmlString} from "@/modules/quiz/hooks/useRemark";
import {Message} from "ai";
import {Send} from "@/components/svgs";
import {isSupported, subscribe} from 'on-screen-keyboard-detector';
import Image from "next/image";
import {motion} from "framer-motion"


const systemPrompt = `
당신은 퀴즈에 대한 해설을 해주는 역할입니다.
`

const userPrompt = `
아래 퀴즈에 대한 해설을 부탁합니다.
그리고 이전 대화 내용을 묻는 질문에 대한 대답을 피해주세요.
`
const invisibleMessageId = 'invisible'
const isInvisibleMessage = (id: string) => id === invisibleMessageId;

type ExplanationComponentProps = {
    quizHtml: Quiz,
    answer: number,
    solution: string,
    select: number
}

const image = "https://quizit-storage.s3.ap-northeast-2.amazonaws.com/character1.svg"

const ExplanationComponent = ({quizHtml, answer, solution, select}: ExplanationComponentProps) => {
    const {id: quizId, question, options: quizOptions} = quizHtml;

    const makeUserPrompt = (question: string, answer: number,) => {
        return `
        ${userPrompt}
        문제: ${question}
        문항들: ${JSON.stringify(quizOptions)}
        정답: ${quizOptions[answer]}
        사용자의 선택: ${quizOptions[select]}
    `;
    }

    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        initialMessages: [
            {id: `quiz-${quizId}-1`, role: "assistant", content: solution}
        ]
    })
    const convertedMessages = useMessageToHtmlString(messages, isLoading);

    return (
        <form
            className="flex flex-col justify-between h-full"
            onSubmit={e => handleSubmit(e, {
                options: {
                    body: {
                        chapterId: quizHtml.chapterId,
                        question: question,
                        options: JSON.stringify(quizOptions),
                        answer: quizOptions[answer],
                        choice: quizOptions[select]
                    }
                }
            })}
        >
            <MessageBlockes convertedMessages={convertedMessages} isLoading={isLoading} error={error}/>
            <Input handleInputChange={handleInputChange} input={input}/>
        </form>
    )
}

const MessageBlockes= ({convertedMessages, isLoading, error}: {convertedMessages: Message[], isLoading: boolean, error?: Error}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current)
            ref.current.scrollIntoView({ behavior: "instant" });
    }, [convertedMessages]);

    return (
        <div className="flex flex-col space-y-2.5 overflow-y-auto overflow-x-hidden">
            {
                convertedMessages.map(message => !isInvisibleMessage(message.id) && (
                    <MessageBlock key={message.id} message={message}/>
                ))
            }
            {error && (
                <ErrorMessage />
            )}
            <div ref={ref} />
        </div>
    )
}

const ErrorMessage = () => (
    <div className="flex space-x-2">
        <div className="flex flex-col justify-start w-[28px]">
            <div className="border border-neutral-100 rounded-full">
                <Image
                    src={image}
                    width={30}
                    height={30}
                    alt={"profileImage"}
                />
            </div>
        </div>
        <div className="flex-1 bg-bg-primary rounded-b-xl rounded-tr-xl p-2.5">
            <div className="text-xs text-secondary-800">
                요청이 너무 많습니다. 잠시 후 다시 시도해주세요.
            </div>
        </div>
    </div>
)

const MessageBlock = ({message}: {message: Message}) => {
    if(message.role === 'user') {
        return (
            <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ delay: 0.2 }}
                className="flex self-end space-x-2"
            >
                <div className="flex-1 bg-primary-50 rounded-b-xl rounded-tl-xl p-2.5">
                    <div className="text-xs text-secondary-800 break-all" dangerouslySetInnerHTML={{ __html: (message.content) }}/>
                </div>
                <div className="flex flex-col justify-start w-[28px]">
                    <div className="border border-neutral-100 rounded-full">
                        <Image
                            src={userImage}
                            width={30}
                            height={30}
                            alt={"퀴즈보"}
                        />
                    </div>
                </div>
            </motion.div>
        )
    } else {
        return (
            <div className="flex space-x-2">
                <div className="flex flex-col justify-start w-[28px]">
                    <div className="border border-neutral-100 rounded-full">
                        <Image
                            src={image}
                            width={30}
                            height={30}
                            alt={"profileImage"}
                        />
                    </div>
                </div>
                <div className="flex-1 bg-bg-primary rounded-b-xl rounded-tr-xl p-2.5">
                    <div className="text-xs text-secondary-800" dangerouslySetInnerHTML={{ __html: (message.content) }}/>
                </div>
            </div>
        )
    }
}

type InputProps = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    input: string;
}
const Input = ({handleInputChange, input}: InputProps) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    if (isSupported()) {
        const unsubscribe = subscribe(visibility => {
            if (visibility === "hidden") {
                setIsKeyboardVisible(false);
            }
            else {
                setIsKeyboardVisible(true);
            }
        });
    }

    return (
        <div className={`relative flex ${isKeyboardVisible ? "mb-80" : ""}`}>
            <input
                type="text"
                className={`w-full bg-stone-100 rounded-xl px-5 py-2.5 pl-5 focus:outline-none`}
                placeholder="더 자세한 설명을 해주세요"
                value={input}
                onChange={handleInputChange}
            />
            <button className="absolute right-1 top-1 bottom-1 z-10" type="submit">
                <Send/>
            </button>
        </div>

    )
}

export default ExplanationComponent;