import {QuizItems} from "@/app/quiz/[id]/quiz-items";
import React, {cache, ReactNode} from "react";
import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import {remark} from "remark";
import remarkRehype from "remark-rehype";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import {nonData, quizDummy} from "@/modules/quiz/quizDummy";

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

    const quizContentHtmlString = await processContent(quiz.content);
    const quizContentHtml = changeQuizContentString(quiz, quizContentHtmlString);

    return quizContentHtml
};

const QuizComponent = async ({id}: {id: number}) => {
    const quiz = await getQuiz(id);

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