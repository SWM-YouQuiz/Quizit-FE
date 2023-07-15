import {useCallback, useState} from "react";
import { ItemStatus, QuizStatus} from "@/modules/quiz/types";

const changeArrToSelect = ({idx}: {idx: number}) => {
    const newArr: ItemStatus[] = ['idle', 'idle', 'idle', 'idle'];
    newArr[idx] = newArr[idx] === 'select' ? 'idle' : 'select';
    return newArr;
}

const changeArrSelectToWrong = ({arr}: {arr: ItemStatus[]}) => {
    return arr.map(itemStatus => itemStatus === 'select' ? 'wrong' : itemStatus)
}

const changeArrToCorrect = ({arr, idx}: {arr: ItemStatus[], idx: number}) => {
    const newArr = [...arr];
    newArr[idx] = 'correct';
    return newArr;
}
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

export const useOptionState = (answer: number) => {
    const [itemsStatus, setItemsStatus] = useState<ItemStatus[]>(
        ['idle', 'idle', 'idle', 'idle']
    );

    const changeItemSelect = useCallback((selectedIndex: number, isQuizGraded: boolean) => {
        if(isQuizGraded) return;
        setItemsStatus(prev => changeArrToSelect({idx: selectedIndex}));
    }, []);

    const changeSelectWrong = useCallback(() => {
        setItemsStatus(prev => changeArrSelectToWrong({arr: prev}));
    }, []);

    const changeAnswerCorrect = useCallback(() => {
        setItemsStatus(prev => changeArrToCorrect({arr: prev, idx: answer}));
    }, [answer]);

    return { itemsStatus, changeItemSelect, changeSelectWrong, changeAnswerCorrect };
};