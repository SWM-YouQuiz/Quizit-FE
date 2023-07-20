import React from "react";
import {explanationDummy, noData} from "@/modules/quiz/explanationDummy";

const getExplanationApi = async (quizId: number) => {
    if(quizId < 0 || explanationDummy.length-1 < quizId) {
        return noData;
    } else {
        await new Promise((resolve) =>
            setTimeout(() => resolve(null), 2000)
        )
        return explanationDummy[quizId];
    }
}

const ExplanationComponent = async ({quizId}: {quizId: number}) => {
    const quiz = await getExplanationApi(quizId);

    const {explanation} = quiz;
    return (
        <div>
            {explanation}
        </div>
    )
}

export default ExplanationComponent;