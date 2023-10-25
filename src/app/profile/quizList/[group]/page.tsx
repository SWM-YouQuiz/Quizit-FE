import {Header} from "@/components/Header";
import {BackArrow, Setting} from "@/components/svgs";
import {menuData} from "@/modules/profile/Menu";
import QuizList from "@/modules/profile/quizList/QuizList";
import {ReactNode} from "react";
import Link from "next/link";

export type QuizCardComponent = {
    id: string,
    component: ReactNode
}

const getTitle = (group: keyof UserInfo) => {
    let title = "";
    menuData.forEach(el => {
        if(el.href.includes(group)) {
            title = el.title;
        }
    })
    if(title) {
        return title;
    }
    throw new Error("잘못된 접근입니다.");
}

const getQuizIds = async (group: keyof UserInfo, user: UserInfo) => {
    const quizIds = user[group] as string[]

    quizIds.sort((a, b) => {
        if(a > b) return -1;
        else return 1;
    });

    return quizIds;
}

const QuizListPage = async ({params}: {params: {group: keyof UserInfo}}) => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/profile">
                    <BackArrow/>
                </Link>
                <div className="font-bold">{getTitle(params.group)}</div>
                <div className="hidden">
                    <Setting/>
                </div>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-secondary-50">
                <QuizList group={params.group}/>
            </div>
        </div>
    )
}

export default QuizListPage;