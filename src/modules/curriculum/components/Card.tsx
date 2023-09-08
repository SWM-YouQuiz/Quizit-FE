import {cn} from "@/util/tailwind";
import Image from 'next/image'
import Link from "next/link";
import {ReactNode} from "react";
import Options from "@/modules/curriculum/components/Options";

type CardProps = {
    href?: string,
    imageUrl: string,
    path: string,
    title: string,
    allQuizzes: number,
    solvedQuizzes: number,
    alt: string,
    className?: string,
    children?: ReactNode
}
const Card = ({href="", imageUrl, path, title, allQuizzes, solvedQuizzes, alt, className="", children=null}: CardProps) => {
    return (
        <Link
            href={href}
            className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)}
        >
            <MainContainer imageUrl={imageUrl} path={path} title={title} alt={alt} allQuizzes={allQuizzes} solvedQuizzes={solvedQuizzes}>
                {children}
            </MainContainer>
        </Link>
    )
}

type MainContainerProps = Omit<CardProps, 'className' | 'options'>;
const MainContainer = ({imageUrl, path, title, alt, allQuizzes, solvedQuizzes, children}: MainContainerProps) => (
    <div className="flex space-x-2">
        <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
            <Image
                src={imageUrl}
                width={48}
                height={48}
                alt={alt}
            />
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
            <ProgressBar allQuizzes={allQuizzes} solvedQuizzes={solvedQuizzes}/>
        </div>
    </div>
)

type ProgressBarProps = Pick<CardProps, 'allQuizzes' | 'solvedQuizzes'>
const ProgressBar = ({allQuizzes, solvedQuizzes}: ProgressBarProps) => (
    <div className="space-y-1.5">
        <div className="overflow-hidden flex rounded bg-primary-50 h-2.5">
            <div style={{ width: `${solvedQuizzes / allQuizzes * 100}%` }} className="shadow-none flex flex-col text-center rounded whitespace-nowrap text-white justify-center bg-primary-800"></div>
        </div>
        <div className="leading-[14px] text-xs">
            <span className="text-point1">{`${solvedQuizzes}문제 완료`}</span>
            <span>{`/ ${allQuizzes}문제`}</span>
        </div>
    </div>
)

export default Card;