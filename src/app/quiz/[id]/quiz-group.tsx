"use client"
import React, {ReactNode, useEffect, useState} from "react";
import {SwipeStatus} from "@/modules/quiz/types";
import {useRouter} from "next/navigation";
import {
    AnimatePresence,
} from "framer-motion";
import QuizTransition from "@/app/quiz/[id]/quiz-transition";
import QuizSideTransition from "@/app/quiz/[id]/quiz-side-transition";

const QuizGroup = (props: {id: number, children: ReactNode, nextQuiz: ReactNode, prevQuiz: ReactNode}) => {
    const {children, nextQuiz, prevQuiz} = props;
    const router = useRouter();
    const [swipeStatus, setSwipeStatus] = useState<SwipeStatus>('current');

    useEffect(() => {
        router.prefetch(`${props.id + 1}`);
        router.prefetch(`${props.id - 1}`);
    }, [props.id, router])

    return (
        <AnimatePresence>
            {swipeStatus === "prev" &&
                <QuizSideTransition key={`prev-quiz-${props.id}`} type='prev' swipeStatus={swipeStatus}>
                    {prevQuiz}
                </QuizSideTransition>
            }

            <QuizTransition key={`quiz-${props.id}`} id={props.id} swipeStatus={swipeStatus} setSwipeStatus={setSwipeStatus}>
                {children}
            </QuizTransition>

            {swipeStatus === "next" &&
                <QuizSideTransition key={`next-quiz-${props.id}`} type='next' swipeStatus={swipeStatus}>
                    {nextQuiz}
                </QuizSideTransition>
            }

        </AnimatePresence>
    )
}

export default QuizGroup;