import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import React, {ReactNode} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {Quiz} from "@/modules/quiz/types";

const QuizComponent = ({quiz}: {quiz: Quiz}) => {
    const {content, items, answer} = quiz;
    return (
        <>
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={content}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizItems={items} answer={answer}/>
            </BottomSideContainer>
        </>
    )
}

export default QuizComponent;


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