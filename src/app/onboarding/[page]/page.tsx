import OnboardingIntro from "@/modules/onboarding/OnboaradingIntro";
import OnboardingGoal from "@/modules/onboarding/OnboardingGoal";
import OnboardingFinish from "@/modules/onboarding/OnboardingFinish";

const OnboardingPage = ({params}: {params: {page: string}}) => {
    const pageInt = parseInt(params.page);

    return (
        <div className="flex flex-col h-full">
            <OnboardingSelector page={pageInt}/>
        </div>
    )
}

const OnboardingSelector = ({page}: {page: number}) => {

    if (0 <= page && page <= 2) {
        return (
            <OnboardingIntro page={page}/>
        )
    } else if (page === 3) {
        return (
            <OnboardingGoal/>
        )
    } else if (page === 4) {
        return (
            <OnboardingFinish page={page}/>
        )
    } else {
        throw new Error("페이지를 찾을 수 없습니다.");
    }
}

export default OnboardingPage;