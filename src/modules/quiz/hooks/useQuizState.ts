import {useCallback, useState} from "react";
import {ItemStatus, QuizStatus} from "@/modules/quiz/types";
import {useOptionState} from "@/modules/quiz/hooks/useOptionState";

export const useQuizState = (answer: number) => {
    const { itemsStatus, changeItemSelect, changeSelectWrong, changeAnswerCorrect } = useOptionState(answer);
    const [quizStatus, setQuizStatus] = useState<QuizStatus>('default');

    const isQuizGraded = useCallback(() => {
        return quizStatus !== 'default';
    }, [quizStatus]);

    const gradeSelectIsCorrect = ({itemsStatus, answer}: {itemsStatus: ItemStatus[], answer: number}) => {
        for(let i = 0; i < itemsStatus.length; i++) {
            if(itemsStatus[i] === 'select' && i === answer) {
                return true;
            }
        }
        return false
    }

    const handleSubmit = () => {
        if (isQuizGraded()) return;
        if (gradeSelectIsCorrect({itemsStatus: itemsStatus, answer: answer})) {
            changeAnswerCorrect();
            setQuizStatus('correct');
        } else {
            changeSelectWrong();
            changeAnswerCorrect();
            setQuizStatus('wrong');
        }
    }

    return { itemsStatus, quizStatus, isQuizGraded, handleSubmit, changeItemSelect };
};