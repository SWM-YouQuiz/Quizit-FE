
import React, {forwardRef, ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "./one-light.css";
import {Quiz} from "@/modules/quiz/types";
import QuizGroup from "@/app/quiz/[id]/quiz-group";
import {quizDummy} from "@/modules/quiz/dummy";
import QuizComponent from "@/app/quiz/[id]/quiz";


const processContent = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdownText);
    return processedContent.toString();
}

const getQuiz = async (id: number): Promise<Quiz> => {
    const quiz: Quiz = quizDummy[id];

    const quizContentHtml = await processContent(quiz.content);

    return {...quiz, content: quizContentHtml};
}

const QuizPage = async ({ params }: { params: { id: string } }) => {
    const quiz = await getQuiz(parseInt(params.id));

    return (
        <QuizGroup id={parseInt(params.id)}>
            <QuizComponent quiz={quiz}/>
        </QuizGroup>
    )
}

export default QuizPage;

