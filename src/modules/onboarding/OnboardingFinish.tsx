import {Onboarding5} from "@/components/character";
import Link from "next/link";
import Button from "@/components/ui/Button";

const OnboardingFinish = ({page}: {page: number}) => {

    return (
        <div className="flex-grow overflow-y-auto p-5">
            <div className="h-full flex flex-col items-center space-y-2 justify-between">
                <div className="mt-[180px] flex flex-col items-center">
                    <Onboarding5/>
                    <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">{"모든 준비가 끝났어요.\n시작해볼까요?"}</div>
                </div>
                <Link
                    href={`/curriculum`}
                    className="w-full"
                    replace={true}
                >
                    <Button context="다음"/>
                </Link>
            </div>
        </div>
    )
}

export default OnboardingFinish;

