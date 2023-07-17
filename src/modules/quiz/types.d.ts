export type QuizItem = {
    item_content: string
};

export type Quiz = {
    content: string,
    items: QuizItem[],
    answer: number
};

export type ItemStatus = 'correct' | 'wrong' | 'select' | 'idle';

export type QuizStatus = 'default' | 'correct' | 'wrong';

export type SwipeStatus = 'prev' | 'current' | 'next';