"use client"
import {ReactNode, useState} from "react";
import {QuizFilterContext} from "@/modules/curriculum/Context";

type OptionSheetContainer = {
    children: ReactNode
}
const QuizFilterContainer = ({children}: OptionSheetContainer) => {
    const [quizFilter, setQuizFilter] = useState<QuizFilter>({
        incorrectQuiz: false, markedQuiz: false, unsolvedQuiz: false
    })

    return (
        <QuizFilterContext.Provider value={{quizFilter, setQuizFilter}}>
            {children}
        </QuizFilterContext.Provider>
    )
}

export default QuizFilterContainer;