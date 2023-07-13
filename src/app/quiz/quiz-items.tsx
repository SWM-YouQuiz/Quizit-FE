"use client"
import React, {useCallback, useState} from "react";
import {ItemStatus, QuizItem, QuizStatus} from "@/app/quiz/types";

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
    const [quizStatus, setQuizStatus] = useState<QuizStatus>('default');
    const [itemsStatus, setItemsStatus] = useState<ItemStatus[]>(
        ['idle', 'idle', 'idle', 'idle']
    );

    const isQuizGraded = useCallback(() => {
        return quizStatus !== 'default';
    },[quizStatus])

    const handleClicked = useCallback((selectedIndex: number) => {
        if(isQuizGraded()) return;
        setItemsStatus(prev => changeArrToSelect({idx: selectedIndex}));
    }, [isQuizGraded])

    const changeSelectWrong = useCallback(() => {
        setItemsStatus(prev => changeArrSelectToWrong({arr: prev}))
    }, []);

    const changeAnswerCorrect = useCallback(() => {
        setItemsStatus(prev => changeArrToCorrect({arr: prev, idx: answer}))
    }, [answer]);

    const gradeSelectIsCorrect = () => {
        for(let i = 0; i < itemsStatus.length; i++) {
            if(itemsStatus[i] === 'select' && i === answer) {
                return true;
            }
        }
        return false
    }

    const handleSubmit = () => {
        if(isQuizGraded()) return;
        if(gradeSelectIsCorrect()) {
            changeAnswerCorrect();
            setQuizStatus('correct');
        } else {
            changeSelectWrong();
            changeAnswerCorrect();
            setQuizStatus('wrong');
        }
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
            <SubmitButton handleSubmit={handleSubmit} disable={quizStatus !== 'default'}/>
        </div>
    )
}

const QuizItem = ({itemString, itemStatus, idx, handleClicked}: {
    itemString: string,
    itemStatus: ItemStatus,
    idx: number,
    handleClicked: (selectedIndex: number) => void
}) => (
    <div
        className={`h-14 border-2 rounded-lg shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm
        ${statusColor[itemStatus]}`}
        onClick={() => handleClicked(idx)}
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