"use client"
import React, {useState} from "react";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";
import Sheet from "react-modal-sheet";
import ExplanationComponent from "@/app/quiz/[chapterId]/[quizId]/explanation";
import ExplanationSheet from "@/app/quiz/[chapterId]/[quizId]/explanation-sheet";

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

const statusColor: Record<ItemStatus, string> = {
    'idle': 'border-bg-primary',
    'select': 'border-primary',
    'correct': 'bg-success',
    'wrong': 'bg-error'
};



export const QuizItems = ({quizId, quizOptions}: {quizId: string, quizOptions: string[]}) => {
    const { itemsStatus, isQuizGraded, handleSubmit, changeItemSelect, solution } = useQuizState(quizId);
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
            {
                isQuizGraded() ? (
                    <ExplanationButton handleClick={openBottomSheet}/>
                ) : (
                    <SubmitButton handleSubmit={handleSubmit}/>
                )
            }
            <ExplanationSheet
                isBottomSheetOpen={isBottomSheetOpen}
                closeBottomSheet={closeBottomSheet}
                quizId={quizId}
                solution={solution}
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
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm
        ${statusColor[itemStatus]}`}
        onClick={() => handleOptionClicked(idx)}
    >
        {itemString}
    </div>
)

const SubmitButton = ({handleSubmit}: {handleSubmit: () => void}) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-center px-4 my-1 text-sm text-white bg-primary`}
        onClick={() => handleSubmit()}
    >
        제출
    </div>
)

const ExplanationButton = ({handleClick}: {handleClick: () => void}) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-center px-4 my-1 text-sm text-white bg-secondary`}
        onClick={handleClick}
    >
        해설
    </div>
)