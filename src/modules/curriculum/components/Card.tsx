import {cn} from "@/util/tailwind";
import Image from 'next/image'
import Link from "next/link";

type CardProps = {
    href?: string,
    imageUrl: string,
    path: string,
    title: string,
    percentage: number,
    alt: string,
    className?: string
}
const Card = ({href="", imageUrl, path, title, percentage, alt, className=""}: CardProps) => {
    return (
        <Link href={href} className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)}>
            <MainContainer imageUrl={imageUrl} path={path} title={title} alt={alt}/>
            <ProgressBar percentage={percentage}/>
        </Link>
    )
}

type MainContainerProps = Omit<CardProps, 'percentage' | 'className'>;
const MainContainer = ({imageUrl, path, title, alt}: MainContainerProps) => (
    <div className="flex justify-start space-x-2">
        <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
            <Image
                src={imageUrl}
                width={48}
                height={48}
                alt={alt}
            />
        </div>
        <div className="flex flex-col justify-evenly">
            <div className="text-neutral-500 text-[13px]">
                {path}
            </div>
            <div className="font-semibold text-base">
                {title}
            </div>
        </div>
    </div>
)

const ProgressBar = ({percentage}: {percentage: CardProps['percentage']}) => (
    <div className="overflow-hidden flex h-2.5 rounded bg-primary-50">
        <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center rounded whitespace-nowrap text-white justify-center bg-primary-800"></div>
    </div>
)

export default Card;