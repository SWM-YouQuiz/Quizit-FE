import {useCallback, useState} from "react";
import {useOptionState} from "@/modules/quiz/hooks/useOptionState";
import {postQuizCheck} from "@/modules/quiz/apiServices";

export const useQuizState = (quizId: string) => {
    const { itemsStatus, changeItemSelect, changeSelectWrong, changeSelectCorrect, changeAnswerCorrect } = useOptionState();
    const [quizStatus, setQuizStatus] = useState<QuizStatus>('default');
    const [solution, setSolution] = useState("");

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

    const checkAnswer = async () => {
        const select = findSelect();
        const { answer, solution } = await postQuizCheck({quizId: quizId, answer: select});
        setSolution(solution);
        const isAnswer = answer === select;
        return {answer, isAnswer};
    }

    const handleSubmit = async () => {
        if (isQuizGraded()) return;
        const {answer, isAnswer} = await checkAnswer();
        if (isAnswer) {
            changeSelectCorrect();
            setQuizStatus('correct');
        } else {
            changeSelectWrong();
            changeAnswerCorrect(answer);
            setQuizStatus('wrong');
        }
    }

    return { itemsStatus, quizStatus, isQuizGraded, handleSubmit, changeItemSelect, solution };
};