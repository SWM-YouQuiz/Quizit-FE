type QuizItem = {
    item_content: string
};

type Quiz = {
    content: string,
    items: QuizItem[],
    answer: number
};

type ItemStatus = 'correct' | 'wrong' | 'select' | 'idle';

type QuizStatus = 'default' | 'correct' | 'wrong';