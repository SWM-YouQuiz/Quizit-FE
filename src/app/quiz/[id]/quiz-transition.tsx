"use client"
import {AnimationScope} from "framer-motion";
import React, {ReactNode} from "react";
import {Quiz, SwipeStatus} from "@/modules/quiz/types";
import {useQuizTransition} from "@/modules/quiz/hooks/useQuizTransition";

type QuizTransitionProps = {
    id: number,
    swipeStatus: SwipeStatus,
    setSwipeStatus:  React.Dispatch<React.SetStateAction<SwipeStatus>>,
    children: ReactNode
}

const QuizTransition = ({id, swipeStatus, setSwipeStatus, children}: QuizTransitionProps) => {
    const [animateScope, swipeableHandlers] = useQuizTransition(id, swipeStatus, setSwipeStatus);

    return (
        <div
            className="container h-full w-full absolute inset-0 p-4"
            ref={animateScope as AnimationScope<any>}
        >
            <div
                className="container h-full w-full flex flex-col justify-between"
                {...swipeableHandlers}
            >
                {children}
            </div>
        </div>
    )
}

export default QuizTransition;
