import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import React, {cache, ReactNode} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {nonData, quizDummy} from "@/modules/quiz/quizDummy";
import {markdownToHtmlString} from "@/util/markdown";

const changeQuizContentString = (quiz: Quiz, quizContentHtmlString: string): Quiz => {
    return {
        ...quiz,
        content: quizContentHtmlString
    }
}

// TODO: Api 연동 시 이 함수를 변경할 것
const getQuizApi = async (id: number) => {
    if(id < 0 || quizDummy.length-1 < id) {
        return nonData;
    } else {
        await new Promise((resolve) =>
            setTimeout(() => resolve(null), 2000)
        )
        return quizDummy[id];
    }
}

const getQuiz = async (id: number): Promise<Quiz> => {
    const quiz: Quiz = await getQuizApi(id);

    const quizContentHtmlString = await markdownToHtmlString(quiz.content);
    const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);

    return quizContentHtml
};

const QuizComponent = async ({id}: {id: number}) => {
    const quiz = await getQuiz(id);

    const {content, items, answer} = quiz;
    return (
        <div className="flex flex-col h-full justify-between w-full">
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={content}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizItems={items} answer={answer}/>
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