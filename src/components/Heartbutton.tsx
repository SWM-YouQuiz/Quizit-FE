"use client"
import React, {useEffect, useState} from "react";
import {getSession, useSession} from "next-auth/react";
import {getQuizMark, revalidateTagAction} from "@/modules/quiz/serverApiActions";
import {motion} from "framer-motion";
import {HeartRed, HeartWhite} from "@/components/svgs";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import {authenticateSession} from "@/util/session";
import {getUser} from "@/modules/profile/serverApiActions";

const useSquareHeartButton = ({quizId, markedUserIds, userId}: {quizId: string, markedUserIds: string[], userId: string}) => {
    const [isMarked, setIsMarked] = useState(false);

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

    const handleHeartClicked = () => {
        getQuizMark({id: quizId})
            .then((quiz) => {
                checkMarked(quiz.markedUserIds);
            })
            .catch(e => {
                console.log("error!!@!@!", e);
            })
    }

    return {handleHeartClicked, isMarked};
}

export const HeartSquareButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const {data, status} = useSession();
    const userId = status === "authenticated" ? data.user.user.id : "-1";
    const {handleHeartClicked, isMarked} = useSquareHeartButton({quizId, markedUserIds, userId});

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

const Heartbutton  = ({quizId, markedUserIds, userId}: {quizId: string, markedUserIds: string[], userId: string}) => {
    const {handleHeartClicked, isMarked} = useSquareHeartButton({quizId, markedUserIds, userId});

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