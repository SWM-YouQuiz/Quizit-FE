import {useCallback, useState} from "react";

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