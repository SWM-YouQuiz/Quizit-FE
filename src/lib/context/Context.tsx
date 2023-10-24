"use client"
import {createContext, Dispatch, MouseEventHandler, SetStateAction} from "react";

export type OptionSheetContextType = null | {
    closeBottomSheet: () => void,
    openBottomSheet: () => void,
    handleOptionsClick: MouseEventHandler<HTMLDivElement>,
    handleDocumentClick: MouseEventHandler<HTMLDivElement>,
    handleCancelClick: MouseEventHandler<HTMLDivElement>,
    setDocumentUrl: Dispatch<SetStateAction<string>>,
}

export const OptionSheetContext = createContext<OptionSheetContextType>(null);


export type QuizFilterContextType = {
    quizFilter: QuizFilter,
    setQuizFilter: undefined |  Dispatch<SetStateAction<QuizFilter>>
}

export const QuizFilterContext = createContext<QuizFilterContextType>({
    quizFilter: {
        markedQuiz: false,
        incorrectQuiz: false,
        unsolvedQuiz: false
    },
    setQuizFilter: undefined
});

export type QuizContextType = QuizContextState & {
    dispatch: Dispatch<QuizContextAction> | undefined
}

export const QuizContext = createContext<QuizContextType>({
    user: undefined,
    accessToken: "",
    dispatch: undefined
})