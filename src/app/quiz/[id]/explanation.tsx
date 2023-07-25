"use client"

import React, {startTransition, useEffect, useMemo, useRef, useState} from "react";
import {explanationDummy, noData} from "@/modules/quiz/explanationDummy";
import {useChat, useCompletion} from "ai/react";
import {markdownToHtmlString} from "@/util/markdown";
import {useMessageToHtmlString} from "@/modules/quiz/hooks/useRemark";
import {Message} from "ai";

const getExplanationApi = (quizId: number) => {
    if(quizId < 0 || explanationDummy.length-1 < quizId) {
        return noData;
    } else {
        return explanationDummy[quizId];
    }
}

const systemPrompt = `
당신은 퀴즈에 대한 해설을 해주는 역할입니다.
퀴즈의 형식은 아래와 같습니다.
사용자에게 정답의 번호와 문제의 형태를 유추할 수 있는 정보를 제공해서는 안됩니다. 정답의 경우에는 정답 번호 대신에 정답의 내용(item_content)를 언급하세요.
content: 퀴즈 내용
items: 퀴즈 문항들
answer: 정답 (0~3)
`

const userPrompt = `
아래 퀴즈에 대한 해설을 부탁합니다.
그리고 이전 대화 내용을 묻는 질문에 대한 대답을 피해주세요.
    `
const invisibleMessageId = 'invisible'
const isInvisibleMessage = (id: string) => id === invisibleMessageId;

const ExplanationComponent = ({quizId}: {quizId: number}) => {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {id: invisibleMessageId, "role": "system", "content": systemPrompt},
            {id: invisibleMessageId, role: "user", content: userPrompt},
            {id: `quiz-${quizId}-2`, role: "assistant", content: getExplanationApi(quizId).explanation}
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