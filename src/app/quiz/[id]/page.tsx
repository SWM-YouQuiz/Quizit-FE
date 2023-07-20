
import React, {cache, Suspense} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "../../../modules/quiz/styles/one-light.css";
import {nonData, quizDummy} from "@/modules/quiz/dummy";
import QuizComponent from "@/app/quiz/[id]/quiz";
import QuizSwiper from "@/app/quiz/[id]/quiz-swiper";


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
const getQuizApi = (id: number) => {
    if(id < 0 || 4 < id) {
        return nonData;
    } else {
        return quizDummy[id];
    }
}

const getQuiz = cache(async (id: number): Promise<Array<Quiz>> => {
    const allQuiz: Quiz[] = quizDummy;

    const quizContentHtmls = Promise.all([
        ...allQuiz.map(quiz => processContent(quiz.content))
    ]).then((quizContentHtmlStrings) => {
        return quizContentHtmlStrings.map(
            (quizContentHtmlString, index) => changeQuizContentString(allQuiz[index], quizContentHtmlString)
        )
    })

    return quizContentHtmls
});

const QuizPage = async ({ params }: { params: { id: string } }) => {

    return (
        <QuizSwiper>
            {Array.from({ length: 15 }, (_, index) => (
                <Suspense key={`quiz-suspense-`} fallback={<QuizComponent id={-1}/>}>
                    <QuizComponent id={index}/>
                </Suspense>
            ))}
        </QuizSwiper>

    )
}

export default QuizPage;

