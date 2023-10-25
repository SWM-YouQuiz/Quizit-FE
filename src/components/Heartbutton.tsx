"use client"
import React, {MouseEventHandler, useContext, useEffect, useState} from "react";
import {getQuizMark} from "@/modules/quiz/serverApiActions";
import {motion} from "framer-motion";
import {HeartRed, HeartWhite} from "@/components/svgs";
import {useDebounce} from "@/lib/hooks/useDebounce";
import {QuizContext} from "@/lib/context/Context";

const useSquareHeartButton = ({quizId, markedUserIds, userId}: {quizId: string, markedUserIds: string[], userId: string}) => {
    const [isMarked, setIsMarked] = useState(false);
    const {accessToken} = useContext(QuizContext);
    const handleHeartClicked:MouseEventHandler<HTMLButtonElement> = (event) => {
        getQuizMark({accessToken: accessToken, id: quizId})
            .then((quiz) => {
                checkMarked(quiz.markedUserIds);
            });
    }

    const { call: debouncedClick } = useDebounce(handleHeartClicked, 3000);

    const checkMarked = async (_markedUserIds: string[]) => {
        if (_markedUserIds.some(_userId => _userId === userId)) {
            setIsMarked(true);
        } else {
            setIsMarked(false);
        }
    }

    useEffect(() => {
        checkMarked(markedUserIds);
    }, [markedUserIds, userId]);

    return {debouncedClick, isMarked};
}

export const HeartSquareButton = ({quizId, markedUserIds, userId}: {quizId: string, markedUserIds: string[], userId: string}) => {
    const {debouncedClick, isMarked} = useSquareHeartButton({quizId, markedUserIds, userId});

    return (
        <motion.button
            type="button"
            className="w-[50px] rounded-xl bg-primary-50 grid place-items-center"
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                debouncedClick();
            }}
            whileTap={{ scale: 0.9 }}
        >
            {
                isMarked ? <HeartRed/> : <HeartWhite/>
            }
        </motion.button>
    )
}

const Heartbutton  = ({quizId, markedUserIds, userId}: {quizId: string, markedUserIds: string[], userId: string}) => {
    const {debouncedClick, isMarked} = useSquareHeartButton({quizId, markedUserIds, userId});

    return (
        <motion.button
            type="button"
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                debouncedClick(e);
            }}
            whileTap={{ scale: 0.9 }}
        >
            {
                isMarked ? <HeartRed/> : <HeartWhite/>
            }
        </motion.button>
    )
}
export default Heartbutton;