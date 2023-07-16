"use client"
import {useAnimate, usePresence, ValueAnimationTransition} from "framer-motion";
import React, {ReactNode, useEffect} from "react";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {Quiz, SwipeStatus} from "@/modules/quiz/types";

type QuizSideTransitionProps = {
    type: SwipeStatus
    swipeStatus: SwipeStatus,
    children: ReactNode
}

const onTheLeft = {x: "-100%"};
const onTheRight = {x: "100%"};
const QuizSideTransition = ({type, swipeStatus, children}: QuizSideTransitionProps) => {
    const [scope, animate] = useAnimate()
    const [isPresent, safeToRemove] = usePresence()

    useEffect(() => {
        const exitAnimation = async () => {
            if (type === "next")
                await animate(scope.current, onTheLeft, {duration: 0.5, ease: "easeInOut"})
            else if (type === "prev")
                await animate(scope.current, onTheRight, {duration: 0.5, ease: "easeInOut"})
        }
        exitAnimation()

    }, [swipeStatus, isPresent, animate, scope, type])

    return (
        <div
            className={`container h-full w-full flex flex-col justify-between p-4 absolute top-0 ${type === 'prev' ? '-left-full' : '-right-full'}`}
            ref={scope}
        >
            {children}
        </div>

    )
}

export default QuizSideTransition;

