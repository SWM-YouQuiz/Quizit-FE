type QuizItem = {
    item_content: string
};

type Quiz = {
    content: string,
    items: QuizItem[],
    answer: number
};

type Explanation = {
    explanation: string
}

type QuizExplanationComponents = {
    id: number,
    quizComponent: ReactNode,
}

type ItemStatus = 'correct' | 'wrong' | 'select' | 'idle';

type QuizStatus = 'default' | 'correct' | 'wrong';