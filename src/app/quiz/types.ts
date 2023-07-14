export type QuizItem = {
    item_content: string
};

export type Quiz = {
    content: string,
    items: QuizItem[],
    answer: number
};

export type ItemStatus = 'answer' | 'wrong' | 'select' | 'idle'