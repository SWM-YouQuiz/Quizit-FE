type Quiz = {
    id: string,
    question: string,
    writerId: string,
    chapterId: string,
    answerRate: number,
    options: string[],
    correctCount: number,
    incorrectCount: number,
    createdDate: string,
    markedUserIds: string[],
    likedUserIds: string[],
    unlikedUserIds: string[]
};

type QuizComponents = {
    id: string,
    quizComponent: ReactNode,
}

type ItemStatus = 'correct' | 'wrong' | 'select' | 'idle';

type QuizStatus = 'default' | 'correct' | 'wrong';

type QuizCheck = {
    answer: number,
    solution: string
}