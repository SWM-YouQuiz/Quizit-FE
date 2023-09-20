import {Header} from "@/components/Header";
import {Rightarrow, Setting} from "@/components/svgs";
import Image from "next/image";
import CalendarHeatmapComponent from "@/modules/profile/CalendarHeatmap";
import Link from "next/link";
import Menu from "@/modules/profile/Menu";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import QuizCard from "@/modules/profile/components/QuizCard";
import QuizList from "@/modules/profile/quizList/QuizList";

const validRoute = [
    "correctQuizIds",
    "incorrectQuizIds",
    "markedQuizIds"
]

const QuizListPage = async ({params}: {params: {group: keyof UserInfo}}) => {
    const session = await getServerSession(authOptions);

    if(!session) {
        throw new Error("오류가 발생했습니다.");
    }

    if(!validRoute.includes(params.group)) {
        throw new Error("잘못된 접근입니다.");
    }

    const quizzes = session.user.user[params.group] as string[];

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold"></div>
                <Setting/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-white">
                <QuizList quizIds={quizzes}/>
            </div>
        </div>
    )
}

const BodyContainer = ({quizIds}: {quizIds: string[]}) => {
    return (
        <div className="space-y-6">

        </div>
    )
}


export default QuizListPage;