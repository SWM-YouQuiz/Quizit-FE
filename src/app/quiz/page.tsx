import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import React, {ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import "./one-light.css";
import { Quiz } from "@/app/quiz/types";
import {QuizItems} from "@/app/quiz/quiz-items";


const processContent = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(markdownText);
    return processedContent.toString();
}

const getQuiz = async () => {
    const quiz: Quiz = {
        content: `2. 다음 TypeScript 코드에서 **오류**를 찾아주세요.
    
    \`\`\`tsx
    
    class Animal {
      speak() {
        console.log("The animal makes a sound");
      }
    }
    class Dog extends Animal {
      speak() {
        console.log("The dog barks");
      }
    }
    const myDog: Animal = new Dog();
    myDog.speak();
    
    \`\`\``,
        items: [
            {
                item_content: "클래스 선언이 잘못됨"
            },
            {
                item_content: "클래스 상속이 잘못됨"
            },
            {
                item_content: "상수 선언이 잘못됨"
            },
            {
                item_content: "오류 없음"
            }
        ],
        answer: 2
    }

    const quizContentHtml = await processContent(quiz.content);

    return {quizContentHtml: quizContentHtml, quizItems: quiz.items, answer: quiz.answer};
}

const Quiz = async () => {
    const {quizContentHtml, quizItems, answer} = await getQuiz();

    const handleCorrect = () => {

    }

    const handleWrong = () => {

    }

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
    <div className="container w-full flex flex-col">
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
    <div className="mt-2">
        <div dangerouslySetInnerHTML={{ __html: quizContentHtml }}/>
    </div>
)

const BottomSideContainer = ({children} : {children: ReactNode}) => {
    return (
        <div className="container flex flex-col">
            {children}
        </div>
    )
}

export default Quiz;