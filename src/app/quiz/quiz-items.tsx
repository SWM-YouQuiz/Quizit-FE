import React from "react";
import { QuizItem} from "@/app/quiz/types";

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]

export const QuizItems = ({quizItems}: {quizItems: QuizItem[]}) => (
    <div className="container flex flex-col">
        {
            quizItems.map((item, idx) => {
                const itemString = `${optionSignature[idx]}. ${item.item_content}`
                return (
                    <QuizItem key={`quiz_item_${idx}`} itemString={itemString}/>
                )
            })
        }
    </div>
)

const QuizItem = ({itemString}: { itemString: string}) => (
    <div className="h-14 border-2 rounded-lg border-bg-primary shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm">
        {itemString}
    </div>
)