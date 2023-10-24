"use client"
import {cn} from "@/util/tailwind";
import Image from 'next/image'
import Link from "next/link";
import {ReactNode, useContext, useEffect, useState} from "react";
import {getChapterProgress, getCourseProgress, getCurriculumProgress} from "@/modules/curriculum/serverApiActions";
import {QuizContext} from "@/lib/context/Context";

type CardProps = {
    type: "curriculum" | "course" | "chapter",
    id: string,
    href?: string,
    imageUrl: string,
    path: string,
    title: string,
    alt: string,
    className?: string,
    children?: ReactNode
}

const Card = ({type, id, href="", imageUrl, path, title, alt, className="", children=null}: CardProps) => {
    const {accessToken} = useContext(QuizContext)
    const [progress, setProgress] = useState<Progress | null>(null);

    const handleGetProgress = async ({type, id}: {type: CardProps["type"], id: string}) => {
        if(type === "curriculum") {
            return getCurriculumProgress({curriculumId: id, accessToken});
        } else if (type === "course") {
            return getCourseProgress({courseId: id});
        } else {
            return getChapterProgress({chapterId: id, accessToken});
        }
    }

    useEffect(() => {
        handleGetProgress({type, id})
            .then(r => setProgress(r));
    }, [id, type])

    return (
        <Link
            href={href}
            className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4 h-[120px]", className)}
        >
            <MainContainer imageUrl={imageUrl} path={path} title={title} alt={alt} progress={progress}>
                {children}
            </MainContainer>
        </Link>
    )
}

type MainContainerProps = Omit<CardProps, 'className' | 'options' | 'type' | 'id'> & {progress: Progress | null};
const MainContainer = ({imageUrl, path, title, alt, progress, children}: MainContainerProps) => (
    <div className="flex space-x-2">
        <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
            <Image
                src={imageUrl}
                width={48}
                height={48}
                alt={alt}
            />
        </div>
        <div className="flex-grow space-y-3 overflow-hidden">
            <div className="flex">
                <div className="flex-grow flex flex-col justify-evenly">
                    <p className="text-secondary-400 text-[13px]">
                        {path}
                    </p>
                    <p className="font-semibold text-base overflow-hidden whitespace-nowrap truncate">
                        {title}
                    </p>
                </div>
                {children}
            </div>
            {progress && <ProgressBar total={progress.total} solved={progress.solved}/>}
        </div>
    </div>
)

type ProgressBarProps = Progress
const ProgressBar = ({total, solved}: ProgressBarProps) => (
    <div className="space-y-1.5">
        <div className="overflow-hidden flex rounded bg-primary-50 h-2.5">
            <div style={{ width: `${solved / total * 100}%` }} className="shadow-none flex flex-col text-center rounded whitespace-nowrap text-white justify-center bg-primary-800"></div>
        </div>
        <div className="leading-[14px] text-xs">
            <span className="text-point1">{`${solved}문제 완료`}</span>
            <span>{`/ ${total}문제`}</span>
        </div>
    </div>
)

export default Card;