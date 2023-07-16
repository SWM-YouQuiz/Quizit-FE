
import React, {forwardRef, ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "./one-light.css";
import {Quiz} from "@/modules/quiz/types";
import QuizGroup from "@/app/quiz/[id]/quiz-group";
import {nonData, quizDummy} from "@/modules/quiz/dummy";
import QuizComponent from "@/app/quiz/[id]/quiz";


const processContent = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdownText);
    return processedContent.toString();
}

const changeQuizContentString = (quiz: Quiz, quizContentHtmlString: string): Quiz => {
    return {
        ...quiz,
        content: quizContentHtmlString
    }
}

const getQuizApi = (id: number) => {
    if(id < 0 || 4 < id) {
        return nonData;
    } else {
        return quizDummy[id];
    }
}

const getQuiz = async (id: number): Promise<Array<Quiz>> => {
    const prevQuiz: Quiz = getQuizApi(id-1);
    const currentQuiz: Quiz = getQuizApi(id);
    const nextQuiz: Quiz = getQuizApi(id+1);

    const quizContentHtmls = Promise.all([
        processContent(prevQuiz.content),
        processContent(currentQuiz.content),
        processContent(nextQuiz.content),
    ]).then((quizContentHtmlStrings) => {
        return [
            changeQuizContentString(prevQuiz, quizContentHtmlStrings[0]),
            changeQuizContentString(currentQuiz, quizContentHtmlStrings[1]),
            changeQuizContentString(nextQuiz, quizContentHtmlStrings[2]),
        ]
    })

    return quizContentHtmls
}

const QuizPage = async ({ params }: { params: { id: string } }) => {
    const quizs = await getQuiz(parseInt(params.id));

    return (
        <QuizGroup
            id={parseInt(params.id)}
            prevQuiz={<QuizComponent quiz={quizs[0]}/>}
            nextQuiz={<QuizComponent quiz={quizs[2]}/>}
        >
            <QuizComponent quiz={quizs[1]}/>
        </QuizGroup>
    )
}

export default QuizPage;

