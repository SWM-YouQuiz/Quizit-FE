"use client"
import React, {useCallback, useState} from "react";
import {ItemStatus, QuizItem} from "@/app/quiz/types";

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

const changeArrToSelect = ({idx}: {idx: number}) => {
    const newArr: ItemStatus[] = ['idle', 'idle', 'idle', 'idle'];
    newArr[idx] = newArr[idx] === 'select' ? 'idle' : 'select';
    return newArr;
}

const changeArrSelectToWrong = ({arr}: {arr: ItemStatus[]}) => {
     return arr.map(itemStatus => itemStatus === 'select' ? 'wrong' : itemStatus)
}

const changeArrToCorrect = ({arr, idx}: {arr: ItemStatus[], idx: number}) => {
    arr[idx] = 'correct';
    return arr;
}

export const QuizItems = ({quizItems, answer}: {quizItems: QuizItem[], answer: number}) => {
    const [itemsStatus, setItemsStatus] = useState<ItemStatus[]>(
        ['idle', 'idle', 'idle', 'idle']
    );

    const handleClicked = useCallback((selectedIndex: number) => {
        setItemsStatus(prev => changeArrToSelect({idx: selectedIndex}));
    }, [])

    const changeSelectWrong = useCallback(() => {
        setItemsStatus(prev => changeArrSelectToWrong({arr: prev}))
    }, []);

    const changeAnswerCorrect = useCallback(() => {
        setItemsStatus(prev => changeArrToCorrect({arr: prev, idx: answer}))
    }, [answer]);

    // 채점을 합니다.
    const handleSubmit = () => {
        for(let i = 0; i < itemsStatus.length; i++) {
            if(itemsStatus[i] === 'select' && i === answer) {
                changeAnswerCorrect();
                return;
            }
        }
        changeSelectWrong();
        changeAnswerCorrect();
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
                            itemStatus={itemsStatus[idx]}
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

const QuizItem = ({itemString, itemStatus, idx, handleClicked}: {
    itemString: string,
    itemStatus: ItemStatus,
    idx: number,
    handleClicked: (selectedIndex: number) => void}
) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm
        ${statusColor[itemStatus]}`}
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