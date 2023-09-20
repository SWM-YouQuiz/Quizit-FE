import Link from "next/link";
import {cn} from "@/util/tailwind";
import {ReactNode} from "react";
import Image from "next/image";
import "server-only";

type CardProps = {
    href?: string,
    imageUrl: string,
    path: string,
    title: string,
    alt: string,
    className?: string,
    children?: ReactNode
}

const QuizCard = ({href="", imageUrl, path, title, alt, className="", children=null}: CardProps) => {
    return (
        <Link
            href={href}
            className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)}
        >
            <MainContainer imageUrl={imageUrl} path={path} title={title} alt={alt}>
                {children}
            </MainContainer>
            <div className="flex">
                <div className="self-end">hello</div>
            </div>
        </Link>
    )
}

export default QuizCard;


type MainContainerProps = Omit<CardProps, 'className' | 'options'>;
const MainContainer = ({imageUrl, path, title, alt, children}: MainContainerProps) => (
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
        </div>
    </div>
)