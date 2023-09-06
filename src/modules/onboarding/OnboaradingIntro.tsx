import {ReactNode} from "react";
import {Onboarding1, Onboarding3, Onboarding4, Onboarding2} from "@/components/character";
import Button from "@/components/ui/Button";
import Link from "next/link";

type OnBoardingType = {
    svg: ReactNode,
    content: string
}

const onBordingData: OnBoardingType[] = [
    {
        svg: <Onboarding1/>,
        content: "언제 어디서나\n개발 지식을 점검해보세요"
    },
    {
        svg: <Onboarding2/>,
        content: "퀴즈를 풀고 자세한 풀이를\n퀴즈보에게 요청해보세요"
    },
    {
        svg: <Onboarding3/>,
        content: "특정 조건을 달성하여\n뱃지를 획득하고 성장하세요"
    }
]

const OnboardingIntro = ({page}: {page: number}) => {
    const svg = onBordingData[page].svg
    const content = onBordingData[page].content
    return (
        <div className="flex-grow overflow-y-auto p-5 bg-white">
            <Onboarding svg={svg} content={content} page={page}/>
        </div>
    )
}


export const Onboarding = ({svg, content, page}: OnBoardingType & {page: number}) => (
    <div className="h-full flex flex-col items-center space-y-2 justify-between">
        <div className="mt-[180px] flex flex-col items-center">
            {svg}
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold px-16 whitespace-break-spaces">{content}</div>
        </div>
        <Link
            href={`/onboarding/${page+1}`}
            className="w-full"
            replace={true}
        >
            <Button context="다음"/>
        </Link>
    </div>
)

export default OnboardingIntro;