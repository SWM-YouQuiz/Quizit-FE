"use client"

import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import React, {ReactNode} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {Quiz, QuizItem} from "@/modules/quiz/types";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {useRouter} from "next/navigation";

export const QuizComponent = ({content: quizContentHtml, items: quizItems, answer, id}: Quiz & {id: number}) => {
    const router = useRouter();

    const config = {
        delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: false,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: 200,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    }

    const handleSwipe = (eventData: SwipeEventData) => {
        if(eventData.dir === 'Right') {
            router.push(`${id-1}`)
        } else if (eventData.dir === 'Left') {
            router.push(`${id+1}`)
        }
    }

    const handlers = useSwipeable({
        onSwiped: handleSwipe,
        ...config,
    });

    return (
        <div className="container h-full w-full flex flex-col justify-between" {...handlers}>
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={quizContentHtml}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizItems={quizItems} answer={answer}/>
            </BottomSideContainer>
        </div>
    )
}

const TopSideContainer = ({children}: {children: ReactNode}) => (
    <div className="container grow w-full flex flex-col">
        {children}
    </div>
)


const QuizHeader = () => (
    <div className="container flex justify-between">
        <QuizAnswerRate/>
        <QuizTools/>
    </div>
)

const QuizAnswerRate = () => (
    <div className="flex h-full items-center ml-4">
        <p className="text-sm text-center">정답률: 50%</p>
    </div>
)

const QuizTools = () => (
    <div className="container flex justify-between w-32">
        <Heart/>
        <ThumbUp/>
        <ThumbDown/>
        <Share/>
    </div>
)

const QuizContent = ({quizContentHtml}: {quizContentHtml: string}) => (
    <div className="mt-2 flex-auto overflow-y-auto min-h-0 h-64" dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="container flex flex-col">
            {children}
        </div>
    )
}