"use client"
import React, {forwardRef, ReactNode, useEffect, useState} from "react";
import {Quiz, QuizItem, SwipeStatus} from "@/modules/quiz/types";
import {usePathname, useRouter} from "next/navigation";
import {
    AnimatePresence,
    motion, ValueAnimationTransition
} from "framer-motion";
import QuizTransition from "@/app/quiz/[id]/quiz-transition";

const onTheLeft = {x: "-100%"};
const onTheRight = {x: "100%"};
const inTheCenter = {x: 0};
const transition: ValueAnimationTransition = {duration: 0.5, ease: "easeInOut"}

const QuizGroup = (props: {id: number, children: ReactNode}) => {
    const {children} = props;
    const router = useRouter();
    const [swipeStatus, setSwipeStatus] = useState<SwipeStatus>('current');

    useEffect(() => {
        router.prefetch(`${props.id + 1}`);
        router.prefetch(`${props.id - 1}`);
    }, [props.id, router])

    const navigateToNextQuiz = () => {
        router.replace(`${props.id + 1}`);
    }

    const navigateToPrevQuiz = () => {
        router.replace(`${props.id - 1}`);
    }

    return (
        <AnimatePresence>
            <QuizTransition key={`quiz-${props.id}`} {...props} swipeStatus={swipeStatus} setSwipeStatus={setSwipeStatus}>
                {children}
            </QuizTransition>
            {swipeStatus === "next" &&
                <motion.h1
                    key={`next-${props.id}`}
                    className="container h-full w-full flex justify-center items-center absolute inset-0"
                    initial={onTheRight}
                    animate={inTheCenter}
                    exit={onTheLeft}
                    transition={transition}
                    onAnimationComplete={navigateToNextQuiz}
                >
                    Next Loading
                </motion.h1>
            }
            {swipeStatus === "prev" &&
                <motion.h1
                    key={`prev-${props.id}`}
                    className="container h-full w-full flex justify-center items-center absolute inset-0"
                    initial={onTheLeft}
                    animate={inTheCenter}
                    exit={onTheRight}
                    transition={transition}
                    onAnimationComplete={navigateToPrevQuiz}
                >
                    Prev Loading
                </motion.h1>
            }

        </AnimatePresence>
    )
}

export default QuizGroup;

