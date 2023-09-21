import Link from "next/link";
import {cn} from "@/util/tailwind";
import {ReactNode} from "react";
import Image from "next/image";
import {HeartButton} from "@/components/HeartButton";
import {getQuiz} from "@/modules/quiz/serverApiActions";
import {nonData} from "@/modules/quiz/quizDummy";


type CardProps = {
    href?: string,
    className?: string,
    quizId: string
}

const QuizCard = async ({href="", quizId, className=""}: CardProps) => {
    const quiz = await getQuiz({quizId: quizId})
        .catch(e => {
            return nonData;
        })

    return (
        <Link
            href={href}
            className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)}
        >
            <MainContainer title={quiz.question} alt={"퀴즈가 포함된 코스 사진"} imageUrl={"./next.svg"} path={"임시 path"}>
                {/*<HeartButton quizId={quiz.id} markedUserIds={quiz.markedUserIds}/>*/}
            </MainContainer>
            <div className="flex justify-end">
                <div>hello</div>
            </div>
        </Link>
    )
}

export default QuizCard;


type MainContainerProps = {
    imageUrl: string,
    path: string,
    alt: string,
    title: string,
    children: ReactNode
};
const MainContainer = ({imageUrl, path, title, alt, children}: MainContainerProps) => (
    <div className="flex space-x-2">
        <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
            {/*<Image*/}
            {/*    src={"./next.svg"}*/}
            {/*    width={48}*/}
            {/*    height={48}*/}
            {/*    alt={alt}*/}
            {/*/>*/}
        </div>
        <div className="flex-grow space-y-3">
            <div className="flex">
                <div className="flex-grow flex flex-col justify-evenly">
                    <div className="text-secondary-400 text-[13px]">
                        {path}
                    </div>
                    <div className="font-semibold text-base">
                        {title}
                    </div>
                </div>
                {children}
            </div>
        </div>
    </div>
)