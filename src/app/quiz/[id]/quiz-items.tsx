"use client"
import React from "react";
import {ItemStatus, QuizItem} from "@/modules/quiz/types";
import {useQuizState} from "@/modules/quiz/hooks/useQuizState";

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



export const QuizItems = ({quizItems, answer}: {quizItems: QuizItem[], answer: number}) => {
    const { itemsStatus, isQuizGraded, handleSubmit, changeItemSelect } = useQuizState(answer);

    const handleOptionClicked = (selectedIndex: number) => {
        changeItemSelect(selectedIndex, isQuizGraded());
    };

    return (
        <div className="container flex flex-col">
            {
                quizItems.map((item, idx) => {
                    const itemString = `${optionSignature[idx]}. ${item.item_content}`
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
            <SubmitButton handleSubmit={handleSubmit} disable={isQuizGraded()}/>
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

const SubmitButton = ({disable, handleSubmit}: {disable: boolean, handleSubmit: () => void}) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-center px-4 my-1 text-sm text-white ${disable ? 'bg-bg-primary' : 'bg-primary'}`}
        onClick={() => handleSubmit()}
    >
        제출
    </div>
)