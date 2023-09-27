"use client"
import React, {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {getQuizMark, revalidateTagAction} from "@/modules/quiz/serverApiActions";
import {motion} from "framer-motion";
import {HeartRed, HeartWhite} from "@/components/svgs";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import {authenticateSession} from "@/util/session";
import {getUser} from "@/modules/profile/serverApiActions";

const useSquareHeartButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
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
        getQuizMark({id: quizId})
            .then((quiz) => {
                checkMarked(quiz.markedUserIds);
                revalidateTagAction({tag: quizId});
            })
            .catch(e => {
                console.log("error!!@!@!", e);
            })
    }

    return {handleHeartClicked, isMarked};
}


const useHeartButton = ({quizId, markedQuizIds}: {quizId: string, markedQuizIds: string[]}) => {
    const [isMarked, setIsMarked] = useState(false);

    const checkMarked = async () => {
        const user = await getUser();
        const _markedQuizIds = user.markedQuizIds;
        if (_markedQuizIds.some(markedQuizId => quizId === markedQuizId)) {
            setIsMarked(true);
        } else {
            setIsMarked(false);
        }
    }

    useEffect(() => {
        checkMarked();
    }, [])

    const handleHeartClicked = () => {
        console.log("clicked!!", quizId, markedQuizIds);
        getQuizMark({id: quizId})
            .then((quiz) => {
                checkMarked()
            })
            .catch(e => {
                console.log("error!!@!@!", e);
            })
    }

    return {handleHeartClicked, isMarked};
}

export const HeartSquareButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const {handleHeartClicked, isMarked} = useSquareHeartButton({quizId, markedUserIds});

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

const Heartbutton  = ({quizId, markedQuizIds}: {quizId: string, markedQuizIds: string[]}) => {
    const {handleHeartClicked, isMarked} = useHeartButton({quizId, markedQuizIds: markedQuizIds});

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
export default Heartbutton;