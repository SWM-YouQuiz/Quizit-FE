"use client"
import React, {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {getQuizMark} from "@/modules/quiz/serverApiActions";
import {motion} from "framer-motion";
import {HeartRed, HeartWhite} from "@/components/svgs";

const useHeartButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const [isMarked, setIsMarked] = useState(false);

    const checkMarked = async (_markedUserIds: string[]) => {
        const session = await getSession();
        if (session) {
            if (_markedUserIds.some(userId => userId === session.user.user.id)) {
                setIsMarked(true);
            } else {
                setIsMarked(false);
            }
        }
    }

    useEffect(() => {
        checkMarked(markedUserIds);
    }, [])

    const handleHeartClicked = () => {
        console.log("clicked!!", quizId, markedUserIds);
        getQuizMark({id: quizId})
            .then((quiz) => {
                checkMarked(quiz.markedUserIds)
            })
            .catch(e => {
                console.log("error!!@!@!", e);
            })
    }

    return {handleHeartClicked, isMarked};
}

export const HeartSquareButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const {handleHeartClicked, isMarked} = useHeartButton({quizId, markedUserIds});

    return (
        <motion.button
            type="button"
            className="w-[50px] rounded-xl bg-primary-50 grid place-items-center"
            onClick={handleHeartClicked}
            whileTap={{ scale: 0.9 }}
        >
            {
                isMarked ? <HeartRed/> : <HeartWhite/>
            }
        </motion.button>
    )
}

export const HeartButton  = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const {handleHeartClicked, isMarked} = useHeartButton({quizId, markedUserIds});

    return (
        <motion.button
            type="button"
            onClick={handleHeartClicked}
            whileTap={{ scale: 0.9 }}
        >
            {
                isMarked ? <HeartRed/> : <HeartWhite/>
            }
        </motion.button>
    )
}