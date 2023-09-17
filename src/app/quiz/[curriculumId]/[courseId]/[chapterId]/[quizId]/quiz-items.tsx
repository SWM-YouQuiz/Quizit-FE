"use client"
import React, {useEffect, useState} from "react";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";
import {cn} from "@/util/tailwind";
import {HeartRed, HeartWhite} from "@/components/svgs";
import ExplanationSheet from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/explanation-sheet";
import {getQuizMark} from "@/modules/quiz/serverApiActions";
import {getSession, useSession} from "next-auth/react";
import { motion } from 'framer-motion';

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

const statusColor: Record<ItemStatus, string> = {
    'idle': 'text-secondary-800  bg-primary-50',
    'select': 'text-primary-800  bg-primary-200',
    'correct': 'text-primary-800  bg-primary-200 inner-border-2 inner-border-primary-800',
    'wrong': 'bg-bg-error inner-border-2 inner-border-error'
};

type QuizItemsProps = {
    quizHtml: Quiz,
}

export const QuizItems = ({quizHtml}: QuizItemsProps) => {
    const {id: quizId, options: quizOptions, markedUserIds} = quizHtml;
    const { itemsStatus, isQuizGraded, handleSubmit, changeItemSelect, solution, answer, select } = useQuizState(quizId);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const closeBottomSheet = () => {
        setIsBottomSheetOpen(false);
    }

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    }
    const handleOptionClicked = (selectedIndex: number) => {
        changeItemSelect(selectedIndex, isQuizGraded());
    };

    return (
        <div className="w-full flex flex-col">
            <div className="space-y-2.5">
                {
                    quizOptions.map((item, idx) => {
                        const itemString = `${optionSignature[idx]}. ${item}`
                        return (
                            <QuizItem
                                key={`quiz_item_${idx}`}
                                itemString={itemString}
                                itemStatus={itemsStatus[idx]}
                                idx={idx}
                                handleOptionClicked={handleOptionClicked}
                            />
                        )
                    })
                }
            </div>
            <div className="mt-5 flex h-[50px] justify-between space-x-2.5">
                <HeartButton quizId={quizId} markedUserIds={markedUserIds}/>
                {
                    isQuizGraded() ? (
                        <ExplanationButton handleClick={openBottomSheet}/>
                    ) : (
                        <SubmitButton handleSubmit={handleSubmit}/>
                    )
                }
            </div>
            <ExplanationSheet
                isBottomSheetOpen={isBottomSheetOpen}
                closeBottomSheet={closeBottomSheet}
                solution={solution}
                answer={answer}
                select={select}
                quizHtml={quizHtml}
            />

        </div>
    )
}

const QuizItem = ({itemString, itemStatus, idx, handleOptionClicked}: {
    itemString: string,
    itemStatus: ItemStatus,
    idx: number,
    handleOptionClicked: (selectedIndex: number) => void
}) => (
    <div
        className={cn(`min-h-[50px] w-full p-4 whitespace-normal break-words rounded-xl text-[13px]`, statusColor[itemStatus])}
        onClick={() => handleOptionClicked(idx)}
    >
        {itemString}
    </div>
)

const SubmitButton = ({handleSubmit}: {handleSubmit: () => void}) => (
    <div
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-point1`}
        onClick={() => handleSubmit()}
    >
        제출
    </div>
)

const ExplanationButton = ({handleClick}: {handleClick: () => void}) => (
    <div
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-black`}
        onClick={handleClick}
    >
        해설
    </div>
)

const HeartButton = ({quizId, markedUserIds}: {quizId: string, markedUserIds: string[]}) => {
    const [isMarked, setIsMarked] = useState(false);

    const checkMarked = async (_markedUserIds: string[]) => {
        const session = await getSession();
        if(session) {
            if(_markedUserIds.some(userId => userId === session.user.user.id)) {
                setIsMarked(true);
            } else {
                setIsMarked(false);
            }
        }
    }

    useEffect(() => {
        checkMarked(markedUserIds);
    },[])

    const handleHeartClicked = () => {
        getQuizMark({id: quizId})
            .then((quiz) => {
                checkMarked(quiz.markedUserIds)
            })
    }

    return (
        <motion.button
            type="button"
            className="w-[50px] rounded-xl bg-primary-50 grid place-items-center"
            onClick={handleHeartClicked}
            whileTap={{ scale: 0.9 }}
        >
            {
                isMarked ? (
                    <motion.div whileTap={{ scale: 0.6, opacity: 0.5 }}>
                        <HeartRed/>
                    </motion.div>
                ) : (
                    <motion.div whileTap={{ scale: 1.4, opacity: 0.5 }}>
                        <HeartWhite/>
                    </motion.div>
                )
            }
        </motion.button>
    )
}