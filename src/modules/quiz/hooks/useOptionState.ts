import {useCallback, useState} from "react";

const changeArrToSelect = ({idx}: {idx: number}) => {
    const newArr: ItemStatus[] = ['idle', 'idle', 'idle', 'idle'];
    newArr[idx] = newArr[idx] === 'select' ? 'idle' : 'select';
    return newArr;
}

const changeArrSelectToWrong = ({arr}: {arr: ItemStatus[]}) => {
    return arr.map(itemStatus => itemStatus === 'select' ? 'wrong' : itemStatus)
}

const changeArrSelectToCorrect = ({arr}: {arr: ItemStatus[]}) => {
    return arr.map(itemStatus => itemStatus === 'select' ? 'correct' : itemStatus)
}

const changeArrIdxToWrong = ({arr, idx}: {arr: ItemStatus[], idx: number}) => {
    const newArr = [...arr];
    newArr[idx] = 'wrong';
    return newArr;
}

export const useOptionState = () => {
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

    const changeSelectCorrect = useCallback(() => {
        setItemsStatus(prev => changeArrSelectToCorrect({arr: prev}));
    }, []);

    const changeAnswerCorrect = useCallback((idx: number) => {
        setItemsStatus(prev => changeArrIdxToWrong({arr: prev, idx: idx}));
    }, []);

    return { itemsStatus, changeItemSelect, changeSelectWrong, changeSelectCorrect, changeAnswerCorrect };
};