import {useCallback, useState} from "react";
import {useOptionState} from "@/modules/quiz/hooks/useOptionState";
import {postQuizCheck} from "@/modules/quiz/serverApiActions";

export const useQuizState = (quizId: string) => {
    const { itemsStatus, changeItemSelect, changeSelectWrong, changeSelectCorrect, changeAnswerCorrect } = useOptionState();
    const [quizStatus, setQuizStatus] = useState<QuizStatus>('default');
    const [solution, setSolution] = useState("");
    const [answer, setAnswer] = useState<number>(-1);
    const [select, setSelect] = useState<number>(-1);

    const isQuizGraded = useCallback(() => {
        return quizStatus !== 'default';
    }, [quizStatus]);


    const findSelect = () => {
        for(let i = 0; i < itemsStatus.length; i++) {
            if(itemsStatus[i] === 'select') {
               return i;
            }
        }
        return 0;
    }

    const handleSubmit = async () => {
        if (isQuizGraded()) return;
        await checkAnswer();
    }

    const checkAnswer = async () => {
        const select = findSelect();
        const { answer, solution } = await postQuizCheck({quizId: quizId, answer: select});
        setStates(solution, answer, select);
        handleCheck(answer);
    }

    const setStates = (solution: string, answer: number, select: number) => {
        setSolution(solution);
        setAnswer(answer);
        setSelect(select)
    }

    const handleCheck = (answer: number) => {
        if (answer === findSelect()) {
            changeSelectCorrect();
            setQuizStatus('correct');
        } else {
            changeSelectWrong();
            changeAnswerCorrect(answer);
            setQuizStatus('wrong');
        }
    }

    return { itemsStatus, quizStatus, isQuizGraded, handleSubmit, changeItemSelect, solution, answer, select };
};