import {useAnimate, ValueAnimationTransition} from "framer-motion";
import {useEffect} from "react";
import {SwipeEventData, useSwipeable} from "react-swipeable";
import {SwipeStatus} from "@/modules/quiz/types";
import {useRouter} from "next/navigation";

const onTheLeft = {x: "-100%"};
const onTheRight = {x: "100%"};
const transition: ValueAnimationTransition<any> = {duration: 0.5, ease: "easeInOut"}
const config = {
    delta: 10,
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
    swipeDuration: 200,
    touchEventOptions: { passive: true },
}

export const useQuizTransition = (id: number, swipeStatus: SwipeStatus, setSwipeStatus:  React.Dispatch<React.SetStateAction<SwipeStatus>>) => {
    const [animateScope, animate] = useAnimate();
    const router = useRouter();

    const navigateToNextQuiz = () => {
        router.replace(`${id + 1}`);
    }

    const navigateToPrevQuiz = () => {
        router.replace(`${id - 1}`);
    }

    const enterAnimation = async () => {
        await animate(animateScope.current, onTheLeft, transition)
        navigateToNextQuiz();
    }

    const exitAnimation = async () => {
        await animate(animateScope.current, onTheRight, transition)
        navigateToPrevQuiz();
    }

    useEffect(() => {
        if (swipeStatus === "next") {
            enterAnimation()
        } else if (swipeStatus === "prev") {
            exitAnimation()
        }
    }, [swipeStatus, animate, animateScope, enterAnimation, exitAnimation])

    const handleSwipe = (eventData: SwipeEventData) => {
        console.log("eventData", eventData);
        if (eventData.dir === "Right") {
            setSwipeStatus('prev');
        } else if (eventData.dir === "Left") {
            setSwipeStatus('next');
        }
    };

    const swipeableHandlers = useSwipeable({
        onSwiped: handleSwipe,
        ...config,
    });

    return [animateScope, swipeableHandlers];
}


export const useQuizSideTransition = (type: SwipeStatus, swipeStatus: SwipeStatus) => {
    const [animateScope, animate] = useAnimate()

    const exitAnimation = async () => {
        if (type === "next")
            await animate(animateScope.current, onTheLeft, {duration: 0.5, ease: "easeInOut"})
        else if (type === "prev")
            await animate(animateScope.current, onTheRight, {duration: 0.5, ease: "easeInOut"})
    }

    useEffect(() => {
        exitAnimation()
    }, [swipeStatus, animate, animateScope, type, exitAnimation])

    return animateScope;
}