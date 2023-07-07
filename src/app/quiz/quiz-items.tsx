"use client"
import React, {useCallback, useState} from "react";
import { QuizItem} from "@/app/quiz/types";

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

export const QuizItems = ({quizItems}: {quizItems: QuizItem[]}) => {
    const [selecedItem, setSelectedItem] = useState<null | number>(null);

    const handleClicked = useCallback((selectedIndex: number) => {
        setSelectedItem(selectedIndex);
    }, [])

    return (
        <div className="container flex flex-col">
            {
                quizItems.map((item, idx) => {
                    const itemString = `${optionSignature[idx]}. ${item.item_content}`
                    return (
                        <QuizItem
                            key={`quiz_item_${idx}`}
                            itemString={itemString}
                            selected={idx === selecedItem}
                            idx={idx}
                            handleClicked={handleClicked}
                        />
                    )
                })
            }
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