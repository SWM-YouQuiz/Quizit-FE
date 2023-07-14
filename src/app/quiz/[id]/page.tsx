import React, {ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "./one-light.css";
import {Quiz} from "@/modules/quiz/types";
import {QuizComponent} from "@/app/quiz/[id]/quiz";
import {quizDummy} from "@/modules/quiz/dummy";


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

const Quiz = async ({ params }: { params: { id: string } }) => {
    const {content: quizContentHtml, items: quizItems, answer} = await getQuiz(parseInt(params.id));

    return (
        <QuizComponent content={quizContentHtml} items={quizItems} answer={answer} id={parseInt(params.id)}/>
    )
}

export default Quiz;