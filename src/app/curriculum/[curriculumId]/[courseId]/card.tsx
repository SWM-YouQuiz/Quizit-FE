import Link from "next/link";

export const Card = ({description, id}: Chapter) => {

    return (
        <Link href={`/quiz/${id}`} className="flex flex-col justify-around p-2 h-20 border-2 rounded-lg shadow-lg shadow-bg-primary">
            {/*<div className="font-extrabold">{chapter.name}</div>*/}
            <div className="font-light text-sm">{description}</div>
        </Link>
    )
}