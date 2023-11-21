import { useCallback } from "react";

export const useFilter = (quizFilter: QuizFilter) => {
    const incorrectFilter = useCallback((quiz: Quiz, user: UserInfo) => user.incorrectQuizIds.includes(quiz.id), []);
    const unsolvedFilter = useCallback(
        (quiz: Quiz, user: UserInfo) => !user.incorrectQuizIds.includes(quiz.id) && !user.correctQuizIds.includes(quiz.id),
        [],
    );
    const markedFilter = useCallback((quiz: Quiz, user: UserInfo) => user.markedQuizIds.includes(quiz.id), []);

    const filterQuizzes = useCallback(
        (quizzes: Quiz[], user: UserInfo) => {
            let filters: Function[] = [];

            if (quizFilter.incorrectQuiz) filters.push(incorrectFilter);
            if (quizFilter.unsolvedQuiz) filters.push(unsolvedFilter);
            if (quizFilter.markedQuiz) filters.push(markedFilter);

            return quizzes.filter((quiz) => filters.every((filter) => filter(quiz, user)));
        },
        [quizFilter, incorrectFilter, unsolvedFilter, markedFilter],
    );

    return { filter: filterQuizzes };
};
