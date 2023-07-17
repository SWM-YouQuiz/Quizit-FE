"use client"
import React, {ReactNode, useEffect} from "react";
import {Quiz, SwipeStatus} from "@/modules/quiz/types";
import {useQuizSideTransition} from "@/modules/quiz/hooks/useQuizTransition";

type QuizSideTransitionProps = {
    type: SwipeStatus
    swipeStatus: SwipeStatus,
    children: ReactNode
}

const QuizSideTransition = ({type, swipeStatus, children}: QuizSideTransitionProps) => {
    const animateScope = useQuizSideTransition(type, swipeStatus);

    return (
        <div
            className={`container h-full w-full flex flex-col justify-between p-4 absolute top-0 ${type === 'prev' ? '-left-full' : '-right-full'}`}
            ref={animateScope}
        >
            {children}
        </div>
    )
}

export default QuizSideTransition;

