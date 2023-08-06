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

    const gradeSelectIsCorrect = async ({itemsStatus, answer}: {itemsStatus: ItemStatus[], answer: number}) => {
        for(let i = 0; i < itemsStatus.length; i++) {
            if(itemsStatus[i] === 'select') {
                return answer === i;
            }
        }
        return false;
    }

    const getAnswerSolution = async () => {
        const { answer, solution } = await postQuizCheck({quizId: quizId});
        setSolution(solution);
        return answer;
    }

    const handleSubmit = async () => {
        if (isQuizGraded()) return;
        const answer = await getAnswerSolution();
        const isAnswer = await gradeSelectIsCorrect({itemsStatus: itemsStatus, answer: answer})
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