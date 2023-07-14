import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import React, {ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "./one-light.css";
import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import {Quiz} from "@/modules/quiz/types";
import {quizDummy} from "@/modules/quiz/dummy";


const processContent = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdownText);
    return processedContent.toString();
}

const getQuiz = async (id: number) => {
    const quiz: Quiz = quizDummy[id];

    const quizContentHtml = await processContent(quiz.content);

    return {quizContentHtml: quizContentHtml, quizItems: quiz.items, answer: quiz.answer};
}

const Quiz = async ({ params }: { params: { id: string } }) => {
    const {quizContentHtml, quizItems, answer} = await getQuiz(parseInt(params.id));

    return (
        <div className="container h-full w-full flex flex-col justify-between">
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={quizContentHtml}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizItems={quizItems} answer={answer}/>
            </BottomSideContainer>
        </div>
    )
}

const TopSideContainer = ({children}: {children: ReactNode}) => (
    <div className="container grow w-full flex flex-col">
        {children}
    </div>
)


const QuizHeader = () => (
    <div className="container flex justify-between">
        <QuizAnswerRate/>
        <QuizTools/>
    </div>
)

const QuizAnswerRate = () => (
    <div className="flex h-full items-center ml-4">
        <p className="text-sm text-center">정답률: 50%</p>
    </div>
)

const QuizTools = () => (
    <div className="container flex justify-between w-32">
        <Heart/>
        <ThumbUp/>
        <ThumbDown/>
        <Share/>
    </div>
)

const QuizContent = ({quizContentHtml}: {quizContentHtml: string}) => (
    <div className="mt-2 flex-auto overflow-y-auto min-h-0 h-64" dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="container flex flex-col">
            {children}
        </div>
    )
}

export default Quiz;