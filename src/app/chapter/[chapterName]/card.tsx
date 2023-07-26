import Link from "next/link";

export const Card = ({chapter}: {chapter: Chapter}) => {

    return (
        <Link href="/quiz/0" className="flex flex-col justify-around p-2 h-20 border-2 rounded-lg shadow-lg shadow-bg-primary">
            <div>
                <div className="font-extrabold">{chapter.name}</div>
                <div className="font-light text-sm">{chapter.context}</div>
            </div>
        </Link>
    )
}