"use client"
import {useAnimate, usePresence, ValueAnimationTransition} from "framer-motion";
import React, {ReactNode, useEffect} from "react";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {Quiz, SwipeStatus} from "@/modules/quiz/types";
import {useRouter} from "next/navigation";

type QuizTransitionProps = {
    id: number,
    swipeStatus: SwipeStatus,
    setSwipeStatus:  React.Dispatch<React.SetStateAction<SwipeStatus>>,
    children: ReactNode
}

const onTheLeft = {x: "-100%"};
const onTheRight = {x: "100%"};
const transition: ValueAnimationTransition<any> = {duration: 0.5, ease: "easeInOut"}
const QuizTransition = ({id, swipeStatus, setSwipeStatus, children}: QuizTransitionProps) => {
    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence();
    const router = useRouter();

    const navigateToNextQuiz = () => {
        router.replace(`${id + 1}`);
    }

    const navigateToPrevQuiz = () => {
        router.replace(`${id - 1}`);
    }

    const enterAnimation = async () => {
        await animate(scope.current, onTheLeft, transition)

        if(!isPresent)
            safeToRemove();
        navigateToNextQuiz();
    }

    const exitAnimation = async () => {
        await animate(scope.current, onTheRight, transition)

        if(!isPresent)
            safeToRemove();
        navigateToPrevQuiz();
    }

    useEffect(() => {
        if (swipeStatus === "next") {
            enterAnimation()
        } else if (swipeStatus === "prev") {
            exitAnimation()
        }
    }, [swipeStatus, isPresent, animate, scope])

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
        if (eventData.dir === "Right") {
            setSwipeStatus('prev');
        } else if (eventData.dir === "Left") {
            setSwipeStatus('next');
        }
    };

    const handlers = useSwipeable({
        onSwiped: handleSwipe,
        ...config,
    });

    return (
        <div
            className="container h-full w-full absolute inset-0 p-4"
            ref={scope}
        >
            <div
                className="container h-full w-full flex flex-col justify-between"
                {...handlers}
            >
                {children}
            </div>
        </div>

    )
}

export default QuizTransition;

