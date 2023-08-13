import {QuizItems} from "@/app/quiz/[chapterId]/[quizId]/quiz-items";
import React, {cache, ReactNode} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {nonData, quizDummy} from "@/modules/quiz/quizDummy";
import {markdownToHtmlString} from "@/util/markdown";
import {getQuiz} from "@/modules/quiz/serverApiActions";

const changeQuizContentString = (quiz: Quiz, quizContentHtmlString: string): Quiz => {
    return {
        ...quiz,
        question: quizContentHtmlString
    }
}

const getQuizHandler = async (quizId: string) => {
    if(quizId === "-1") return nonData;
    const quiz = await getQuiz({quizId: quizId});
    return quiz;
}

const getQuizHtml = async (id: string): Promise<Quiz> => {
    const quiz: Quiz = await getQuizHandler(id);

    const quizContentHtmlString = await markdownToHtmlString(quiz.question);
    const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);

    return quizContentHtml
};

const QuizComponent = async ({id}: {id: string}) => {
    const quiz = await getQuizHtml(id);

    const {question, options} = quiz;

    return (
        <div className="flex flex-col h-full justify-between w-full">
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={question}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizId={id} quizOptions={options.slice(0,4)}/>
            </BottomSideContainer>
        </div>
    )
}

export default QuizComponent;


const TopSideContainer = ({children}: {children: ReactNode}) => (
    <div className="w-full flex flex-col">
        {children}
    </div>
)


const QuizHeader = () => (
    <div className="w-full flex justify-between">
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
    <div className="mt-2 flex-auto overflow-y-auto min-h-0" dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="w-full flex flex-col">
            {children}
        </div>
    )
}