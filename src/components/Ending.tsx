import {CodingCharacter, Onboarding5} from "@/components/character";
import Button from "@/components/ui/Button";
import Link from "next/link";

const Ready = ({curriculumId, courseId}: {curriculumId: string, courseId: string}) => {
    return (
        <div className="h-full flex flex-col items-center space-y-2 justify-between">
            <div className="mt-[180px] flex flex-col items-center">
                <Onboarding5 className="mt-40"/>
                <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">챕터의 모든 퀴즈를 완료했어요!</div>
            </div>
            <Link className="relative bottom-0 w-full" href={`/curriculum/${curriculumId}/${courseId}`}>
                <Button context="완료" />
            </Link>
        </div>
    )
}

export default Ready;