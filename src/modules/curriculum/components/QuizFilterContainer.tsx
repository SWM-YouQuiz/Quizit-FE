"use client";
import { ReactNode, useState } from "react";
import { QuizFilterContext } from "@/lib/context/Context";

type QuizFilterContainerProps = {
    children: ReactNode;
};
const QuizFilterContainer = ({ children }: QuizFilterContainerProps) => {
    const [quizFilter, setQuizFilter] = useState<QuizFilter>({
        incorrectQuiz: false,
        markedQuiz: false,
        unsolvedQuiz: true,
    });

    return <QuizFilterContext.Provider value={{ quizFilter, setQuizFilter }}>{children}</QuizFilterContext.Provider>;
};

export default QuizFilterContainer;
