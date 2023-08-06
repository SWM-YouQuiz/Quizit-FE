import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import SignoutButton from "@/app/signout-button";
import {getQuizOfChapter, getQuizOfChapterId} from "@/modules/quiz/apiServices";
import {authenticateSession} from "@/util/session";
import {requestApi} from "@/util/fetcher";

const getSession = async () => {
    return await getServerSession(authOptions);
}

const _getQuiz2 = async () => {
    try{
        const res = await fetch(`${process.env.API_URL}/api/quiz/chapter/1`);
        const data = res.json();
        return data;
    } catch (e) {
        console.log("error", (e as Error).message);
    }
}

const Home = async () => {
    const session = await getSession();
    const quiz2 = await _getQuiz2();
    const quiz3 = await _getQuiz2();
    return (
        <main className="flex-grow p-4 relative">
            <p>This is main</p>
            {
                session?.user.accessToken ? (
                    <>
                        <SignoutButton/>
                        <Link href="/course/mvp">go to Course</Link>
                        <p>
                            {session.user.accessToken}
                        </p>
                        <p>
                            {JSON.stringify(quiz2)}
                            {JSON.stringify(quiz3)}
                        </p>
                    </>
                ) : (
                    <Link href="/auth/login">go to Login</Link>
                )
            }
        </main>
    )
}

export default Home;
