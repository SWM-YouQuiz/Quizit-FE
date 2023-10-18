"use client"
import React, {useEffect, useState} from "react";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";
import {cn} from "@/util/tailwind";
import ExplanationSheet from "@/app/quiz/[curriculumId]/[courseId]/[chapterId]/[quizId]/explanation-sheet";
import { motion } from 'framer-motion';
import {HeartSquareButton} from "@/components/Heartbutton";
import {getSession, useSession} from "next-auth/react";


const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

const statusColor: Record<ItemStatus, string> = {
    'idle': 'text-secondary-800  bg-primary-50 inner-border-primary-800',
    'select': 'text-secondary-800  bg-primary-50 inner-border-primary-800 inner-border-2',
    'correct': 'text-primary-800 bg-primary-200 inner-border-2 inner-border-primary-800',
    'wrong': 'bg-bg-error inner-border-error'
};

type QuizItemsProps = {
    quizHtml: Quiz
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
                <HeartSquareButton quizId={quizId} markedUserIds={markedUserIds}/>
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
    <motion.button
        type="button"
        className={cn(`flex min-h-[50px] w-full p-4 rounded-xl`, statusColor[itemStatus])}
        onClick={() => handleOptionClicked(idx)}
        whileTap={{ scale: 0.95 }}
    >
        <p className="whitespace-normal break-keep text-[13px]">{itemString}</p>
    </motion.button>
)

const SubmitButton = ({handleSubmit}: {handleSubmit: () => void}) => (
    <motion.button
        type="button"
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-point1`}
        onClick={() => handleSubmit()}
        whileTap={{ scale: 0.95 }}
    >
        제출
    </motion.button>
)

const ExplanationButton = ({handleClick}: {handleClick: () => void}) => (
    <div
        className={`rounded-xl flex-grow flex items-center justify-center px-4 text-base text-white bg-black`}
        onClick={handleClick}
    >
        해설
    </div>
)

