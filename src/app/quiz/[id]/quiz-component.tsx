"use client"
import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import React, {forwardRef, ReactNode, useEffect, useState} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {Quiz, QuizItem} from "@/modules/quiz/types";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {usePathname, useRouter} from "next/navigation";
import {
    AnimatePresence,
    AnimationDefinition,
    isBrowser,
    useAnimate,
    usePresence,
    motion, ValueAnimationTransition
} from "framer-motion";

type SwipeStatus = 'prev' | 'current' | 'next';
type SingleQuizProps = Quiz & {
    id: number,
    swipeStatus: SwipeStatus,
    setSwipeStatus:  React.Dispatch<React.SetStateAction<SwipeStatus>>
}

const onTheLeft = {x: "-100%"};
const onTheRight = {x: "100%"};
const inTheCenter = {x: 0};
const transition: ValueAnimationTransition = {duration: 0.5, ease: "easeInOut"}

const QuizComponent = (props: Quiz & {id: number}) => {
    const router = useRouter();

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


    const [swipeStatus, setSwipeStatus] = useState<SwipeStatus>('current');
    return (
        <AnimatePresence mode="wait">
            <SingleQuiz key={`quiz-${props.id}`} {...props} swipeStatus={swipeStatus} setSwipeStatus={setSwipeStatus} />
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
                    Next Prev
                </motion.h1>
            }

        </AnimatePresence>
    )
}

const SingleQuiz = ({content: quizContentHtml, items: quizItems, answer, id, swipeStatus, setSwipeStatus}: SingleQuizProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [scope, animate] = useAnimate()
    const [isPresent, safeToRemove] = usePresence()

    useEffect(() => {
        if (swipeStatus === "next") {
            const enterAnimation = async () => {
                await animate(scope.current, onTheLeft, {duration: 0.5, ease: "easeInOut"})
            }
            enterAnimation()

        } else if (swipeStatus === "prev") {
            const exitAnimation = async () => {
                await animate(scope.current, onTheRight, {duration: 0.5, ease: "easeInOut"})
            }
            exitAnimation()
        }
    }, [swipeStatus, isPresent])

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
            // router.replace(`${id - 1}`);
        } else if (eventData.dir === "Left") {
            setSwipeStatus('next');
            // router.replace(`${id + 1}`);
        }
    };

    const handlers = useSwipeable({
        onSwiped: handleSwipe,
        ...config,
    });

    return (
        <div
            className="container h-full w-full"
            ref={scope}
        >
            <div
                className="container h-full w-full flex flex-col justify-between"
                {...handlers}
            >
                <TopSideContainer>
                    <QuizHeader/>
                    <QuizContent quizContentHtml={quizContentHtml}/>
                </TopSideContainer>
                <BottomSideContainer>
                    <QuizItems quizItems={quizItems} answer={answer}/>
                </BottomSideContainer>
            </div>
        </div>

    )
}

export default QuizComponent;

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