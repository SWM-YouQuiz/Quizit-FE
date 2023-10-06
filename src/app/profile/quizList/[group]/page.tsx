import {Header} from "@/components/Header";
import {BackArrow, Rightarrow, Setting} from "@/components/svgs";
import Menu, {menuData} from "@/modules/profile/Menu";
import QuizList from "@/modules/profile/quizList/QuizList";
import {ReactNode, Suspense} from "react";
import QuizCard from "@/modules/profile/components/QuizCard";
import {authenticateSession} from "@/util/session";
import {getUser} from "@/modules/profile/serverApiActions";
import Link from "next/link";
import {authOptions} from "@/modules/auth/auth";

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

    console.log("group", group);

    quizIds.sort((a, b) => {
        if(a > b) return -1;
        else return 1;
    });

    return quizIds;
}

const QuizListPage = async ({params}: {params: {group: keyof UserInfo}}) => {
    const {user} = (await authenticateSession(authOptions)).user;

    const quizIds = await getQuizIds(params.group, user);

    const firstQuizzId = quizIds.slice(0,6);
    const init: QuizCardComponent[] = firstQuizzId.map(quizId => ({
            id: quizId,
            component: (
                <QuizCard quizId={quizId} userId={user.id}/>
            )
        })
    )

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/profile">
                    <BackArrow/>
                </Link>
                <div className="font-bold">{getTitle(params.group)}</div>
                <Setting/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-secondary-50">
                <QuizList quizIds={quizIds.slice(1)} init={init} userId={user.id}/>
            </div>
        </div>
    )
}

export default QuizListPage;