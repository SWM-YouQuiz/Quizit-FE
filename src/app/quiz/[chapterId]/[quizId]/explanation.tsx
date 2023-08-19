"use client"

import React, {startTransition, useEffect, useMemo, useRef, useState} from "react";
import {useChat, useCompletion} from "ai/react";
import {useMessageToHtmlString} from "@/modules/quiz/hooks/useRemark";
import {Message} from "ai";
import {Send} from "@/components/svgs";


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

const ExplanationComponent = ({quizHtml, answer, solution, select}: ExplanationComponentProps) => {
    const {id: quizId, question, options: quizOptions} = quizHtml

    const makeUserPrompt = (question: string, answer: number,) => {
        return `
        ${userPrompt}
        문항들: ${JSON.stringify(quizOptions)}
        정답: ${quizOptions[answer]}
        사용자의 선택: ${quizOptions[select]}
    `;
    }

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {id: invisibleMessageId, role: "system", content: systemPrompt},
            {id: invisibleMessageId, role: "user", content: makeUserPrompt(question, answer)},
            {id: `quiz-${quizId}-2`, role: "assistant", content: solution}
        ]
    })
    const convertedMessages = useMessageToHtmlString(messages, isLoading);

    return (
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
            <MessageBlockes convertedMessages={convertedMessages} />
            <Input handleInputChange={handleInputChange} input={input}/>
        </form>
    )
}

const MessageBlockes= ({convertedMessages}: {convertedMessages: Message[]}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current)
            ref.current.scrollIntoView({ behavior: "instant" });
    }, [convertedMessages]);

    return (
        <div className="flex flex-col space-y-2.5 overflow-auto">
            {
                convertedMessages.map(message => !isInvisibleMessage(message.id) && (
                    <MessageBlock key={message.id} message={message}/>
                ))
            }
            <div ref={ref} />
        </div>
    )
}

const MessageBlock = ({message}: {message: Message}) => {
    if(message.role === 'user') {
        return (
            <div className="flex self-end space-x-2">
                <div className="bg-primary-50 rounded-b-xl rounded-tl-xl p-2.5">
                    <div className="text-xs text-text-dark" dangerouslySetInnerHTML={{ __html: (message.content) }}/>
                </div>
                <div className="flex flex-col justify-start">
                    <div className="w-[28px] h-[28px] bg-primary-800 rounded-full"/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex space-x-2">
                <div className="flex flex-col justify-start">
                    <div className="w-[28px] h-[28px] bg-primary-800 rounded-full"/>
                </div>
                <div className="bg-bg-primary rounded-b-xl rounded-tr-xl p-2.5">
                    <div className="text-xs text-text-dark" dangerouslySetInnerHTML={{ __html: (message.content) }}/>
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
    return (
        <div className="relative flex">
            <input
                type="text"
                className="w-full bg-stone-100 rounded-xl px-5 py-2.5 pl-5 focus:outline-none"
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