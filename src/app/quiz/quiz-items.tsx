"use client"
import React, {useCallback, useState} from "react";
import {ItemStatus, QuizItem} from "@/app/quiz/types";

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

const changeArrToSelect = ({idx}: {idx: number}) => {
    const newArr: ItemStatus[] = ['idle', 'idle', 'idle', 'idle'];
    newArr[idx] = newArr[idx] === 'select' ? 'idle' : 'select';
    return newArr;
}

export const QuizItems = ({quizItems, answer}: {quizItems: QuizItem[], answer: number}) => {
    const [itemsStatus, setItemsStatus] = useState<ItemStatus[]>(['idle', 'idle', 'idle', 'idle']);

    const handleClicked = useCallback((selectedIndex: number) => {
        setItemsStatus(prev => changeArrToSelect({idx: selectedIndex}));
    }, [])

    const handleSubmit = () => {

    }

    return (
        <div className="container flex flex-col">
            {
                quizItems.map((item, idx) => {
                    const itemString = `${optionSignature[idx]}. ${item.item_content}`
                    return (
                        <QuizItem
                            key={`quiz_item_${idx}`}
                            itemString={itemString}
                            selected={itemsStatus[idx] === 'select'}
                            idx={idx}
                            handleClicked={handleClicked}
                        />
                    )
                })
            }
            <SubmitButton handleSubmit={handleSubmit}/>
        </div>
    )
}

const QuizItem = ({itemString, selected, idx, handleClicked}: { itemString: string, selected: boolean, idx: number, handleClicked: (selectedIndex: number) => void}) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm
        ${selected ? 'border-primary' : 'border-bg-primary'}`}
        onClick={() => handleClicked(idx)}
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