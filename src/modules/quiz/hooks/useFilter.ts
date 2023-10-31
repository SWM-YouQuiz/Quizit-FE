import { useCallback } from "react";

export const useFilter = (quizFilter: QuizFilter, user: UserInfo) => {
    const incorrectFilter = useCallback((quiz: Quiz) => user.incorrectQuizIds.includes(quiz.id), [user]);
    const unsolvedFilter = useCallback((quiz: Quiz) => !user.incorrectQuizIds.includes(quiz.id) && !user.correctQuizIds.includes(quiz.id), [user]);
    const markedFilter = useCallback((quiz: Quiz) => user.markedQuizIds.includes(quiz.id), [user]);

    const filterQuizzes = useCallback(
        (quizzes: Quiz[]) => {
            let filters: Function[] = [];

            if (quizFilter.incorrectQuiz) filters.push(incorrectFilter);
            if (quizFilter.unsolvedQuiz) filters.push(unsolvedFilter);
            if (quizFilter.markedQuiz) filters.push(markedFilter);

            return quizzes.filter((quiz) => filters.every((filter) => filter(quiz)));
        },
        [quizFilter, incorrectFilter, unsolvedFilter, markedFilter],
    );

    return { filter: filterQuizzes };
};
