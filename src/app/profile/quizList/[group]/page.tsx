import {Header} from "@/components/Header";
import {Rightarrow, Setting} from "@/components/svgs";
import Menu, {menuData} from "@/modules/profile/Menu";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import QuizList from "@/modules/profile/quizList/QuizList";
import {ReactNode, Suspense} from "react";
import QuizCard from "@/modules/profile/components/QuizCard";

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

const getQuizIds = async (group: keyof UserInfo, session: Session) => {
    const quizIds = session.user.user[group] as string[];

    console.log("group", group);

    quizIds.sort((a, b) => {
        if(a > b) return -1;
        else return 1;
    });

    return quizIds;
}

const QuizListPage = async ({params}: {params: {group: keyof UserInfo}}) => {
    const session = await getServerSession(authOptions);
    if(!session) {
        throw new Error("오류가 발생했습니다.");
    }

    const quizIds = await getQuizIds(params.group, session);

    const firstQuizzId = quizIds.slice(0,6);
    const init: QuizCardComponent[] = firstQuizzId.map(quizId => ({
            id: quizId,
            component: (
                <Suspense key={`quizId-${quizId}`} fallback={<QuizCard quizId={"-1"}/> }>
                    <QuizCard quizId={quizId}/>
                </Suspense>
            )
        })
    )

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">{getTitle(params.group)}</div>
                <Setting/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5 bg-white">
                <QuizList quizIds={quizIds.slice(1)} init={init}/>
            </div>
        </div>
    )
}

export default QuizListPage;