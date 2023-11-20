import { useCallback, useContext, useEffect, useState } from "react";
import { useOptionState } from "@/modules/quiz/hooks/useOptionState";
import { postQuizCheck } from "@/modules/quiz/serverApiActions";
import { QuizContext } from "@/lib/context/Context";
import { markdownToHtmlString } from "@/util/markdown";

const changeQuizContentString = (quiz: Quiz, quizContentHtmlString: string): Quiz => {
    return {
        ...quiz,
        question: quizContentHtmlString,
    };
};

export const useQuizState = (quiz: Quiz) => {
    const { accessToken } = useContext(QuizContext);
    const { itemsStatus, changeItemSelect, changeSelectWrong, changeSelectCorrect, changeAnswerCorrect } = useOptionState();
    const [quizStatus, setQuizStatus] = useState<QuizStatus>("default");
    const [solution, setSolution] = useState("");
    const [answer, setAnswer] = useState<number>(-1);
    const [select, setSelect] = useState<number>(-1);
    const [quizHtml, setQuizHtml] = useState(quiz);
    const quizId = quiz.id;

    const getQuizHtml = async (quiz: Quiz) => {
        const quizContentHtmlString = await markdownToHtmlString(quiz.question);
        const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);
        return quizContentHtml;
    };

    useEffect(() => {
        getQuizHtml(quiz).then((quizContentHtml) => setQuizHtml(quizContentHtml));
    }, [quiz]);

    const isQuizGraded = useCallback(() => {
        return quizStatus !== "default";
    }, [quizStatus]);

    const findSelect = () => {
        for (let i = 0; i < itemsStatus.length; i++) {
            if (itemsStatus[i] === "select") {
                return i;
            }
        }
        return -1;
    };

    const handleSubmit = async () => {
        if (isQuizGraded()) return;
        await checkAnswer();
    };

    const checkAnswer = async () => {
        const select = findSelect();
        const response = await postQuizCheck({
            quizId: quizId,
            answer: select,
            accessToken,
        });
        const { solution, answer, quiz } = response;
        getQuizHtml(quiz).then((quizContentHtml) => setQuizHtml(quizContentHtml));
        setStates(solution, answer, select);
        handleCheck(answer);
    };

    const setStates = (solution: string, answer: number, select: number) => {
        setSolution(solution);
        setAnswer(answer);
        setSelect(select);
    };

    const handleCheck = (answer: number) => {
        if (answer === findSelect()) {
            changeSelectCorrect();
            setQuizStatus("correct");
        } else {
            changeAnswerCorrect(answer);
            setQuizStatus("wrong");
        }
    };

    return {
        quizHtml,
        itemsStatus,
        quizStatus,
        isQuizGraded,
        handleSubmit,
        changeItemSelect,
        solution,
        answer,
        select,
    };
};
