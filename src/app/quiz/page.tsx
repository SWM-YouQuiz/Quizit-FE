import {Heart, Share, ThumbDown, ThumbUp} from "@/components/svgs";
import React, {ReactNode} from "react";
import {remark} from "remark";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

type QuizItem = {
    item_content: string
};

type Quiz = {
    content: string,
    items: QuizItem[]
};

const optionSignature = [
    'A',
    'B',
    'C',
    'D'
]


const processContent = async (markdownText: string) => {
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypeHighlight)
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
        ]
    }

    const quizContentHtml = await processContent(quiz.content);

    return {quizContentHtml: quizContentHtml, quizItems: quiz.items};
}

const Quiz = async () => {
    const {quizContentHtml, quizItems} = await getQuiz();

    return (
        <div className="container h-full flex flex-col justify-between">
            <TopSideContainer>
                <QuizHeader/>
                <QuizContent quizContentHtml={quizContentHtml}/>
            </TopSideContainer>
            <BottomSideContainer>
                <QuizItems quizItems={quizItems}/>
            </BottomSideContainer>
        </div>
    )
}

const TopSideContainer = ({children}: {children: ReactNode}) => (
    <div className="container flex flex-col">
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

const QuizItems = ({quizItems}: {quizItems: QuizItem[]}) => (
    <div className="container flex flex-col">
        {
            quizItems.map((item, idx) => {
                const itemString = `${optionSignature[idx]}. ${item.item_content}`
                return (
                    <QuizItem key={`quiz_item_${idx}`} itemString={itemString}/>
                )
            })
        }
    </div>
)

const QuizItem = ({itemString}: { itemString: string}) => (
    <div className="h-14 border-2 rounded-lg border-bg-primary shadow-lg shadow-bg-primary flex items-center justify-start px-4 my-1 text-sm">
        {itemString}
    </div>
)

export default Quiz;