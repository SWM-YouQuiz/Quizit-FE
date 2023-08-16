"use client"

import React, {startTransition, useEffect, useMemo, useRef, useState} from "react";
import {useChat, useCompletion} from "ai/react";
import {useMessageToHtmlString} from "@/modules/quiz/hooks/useRemark";
import {Message} from "ai";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";


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
            <MessageBlock convertedMessages={convertedMessages} />
            <input
                className="border rounded mb-8 shadow-xl p-2"
                placeholder="더 자세한 설명을 해주세요"
                value={input}
                onChange={handleInputChange}
            />
        </form>
    )
}

const MessageBlock = ({convertedMessages}: {convertedMessages: Message[]}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current)
            ref.current.scrollIntoView({ behavior: "instant" });
    }, [convertedMessages]);

    return (
        <div className="overflow-auto">
            {
                convertedMessages.map(m => !isInvisibleMessage(m.id) && (
                        <div key={m.id} className={`${m.role === 'user' ? "bg-secondary" : "bg-bg-primary"} rounded my-1 p-1`}>
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                            <div className="text-sm" dangerouslySetInnerHTML={{ __html: (m.content) }}/>
                        </div>
                    )
                )
            }
            <div ref={ref} />
        </div>
    )
}

export default ExplanationComponent;