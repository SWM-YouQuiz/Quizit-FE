"use client"
import React, {MouseEventHandler, ReactNode, useContext, useEffect, useState} from "react";
import {getQuizEvaluate} from "@/modules/quiz/serverApiActions";
import {motion} from "framer-motion";
import {cn} from "@/util/tailwind";
import ThumbupIcon from "@/components/icons/ThumbupIcon";
import ThumbdownIcon from "@/components/icons/ThumbdownIcon";
import {useDebounce} from "@/lib/hooks/useDebounce";
import {QuizContext} from "@/lib/context/Context";

type QuizToolsProps = {
    quizId: string,
    likedUserIds: string[],
    unlikedUserIds: string[]
}
const QuizTools = ({quizId, likedUserIds, unlikedUserIds}: QuizToolsProps) => {
    const {user, accessToken} = useContext(QuizContext);
    const [likedCount, setLikedCount] = useState<number>(likedUserIds.length);
    const [unlikedCount, setUnlikedCount] = useState<number>(unlikedUserIds.length);
    const [status, setStatus] = useState<'liked'|'unliked'|'idle'>('idle');

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        const isLike = event.currentTarget.name === "up" ? "True" : "False";

        getQuizEvaluate({id: quizId, isLike: isLike, accessToken})
            .then(quiz => {
                setLikedCount(quiz.likedUserIds.length)
                setUnlikedCount(quiz.unlikedUserIds.length)
                checkLiked(quiz.likedUserIds, quiz.unlikedUserIds);
            })
    }

    const { call: debouncedClick } = useDebounce(handleOnClick, 1000);

    const checkLiked = async (likedUserIds: string[], unlikedUserIds: string[]) => {

        if(user) {
            if (likedUserIds.some(userId => userId === user.id)) {
                setStatus('liked');
            } else if (unlikedUserIds.some(userId => userId === user.id)) {
                setStatus('unliked');
            } else {
                setStatus('idle');
            }
        }
    }

    useEffect(() => {
        checkLiked(likedUserIds, unlikedUserIds);
    },[likedUserIds, unlikedUserIds])

    return (
        <div className="flex space-x-1.5">
            <ThumbButton handleClick={debouncedClick} name="up" className={status==='liked' ? 'stroke-primary-800 text-primary-800 inner-border-primary-800' : 'text-bg-secondary stroke-bg-secondary'}>
                <ThumbupIcon/>
                <span className="text-center text-xs">{likedCount}</span>
            </ThumbButton>
            <ThumbButton handleClick={debouncedClick} name="down" className={status==='unliked' ? 'stroke-primary-800 text-primary-800 inner-border-primary-800' : 'text-bg-secondary stroke-bg-secondary'}>
                <ThumbdownIcon/>
                <span className="text-center text-xs">{unlikedCount}</span>
            </ThumbButton>
        </div>
    )
}

export default QuizTools;


type ThumbButtonProps = {
    children: ReactNode,
    name: string,
    className?: string,
    handleClick: MouseEventHandler<HTMLButtonElement>
}
const ThumbButton = ({handleClick, className="", name, children}: ThumbButtonProps) => {
    return (
        <motion.button
            className={cn("w-10 inner-border-[1px] p-[3px] rounded flex justify-evenly", className)}
            type="button"
            onClick={handleClick}
            name={name}
            whileTap={{ scale: 0.8 }}
        >
            {children}
        </motion.button>
    )
}