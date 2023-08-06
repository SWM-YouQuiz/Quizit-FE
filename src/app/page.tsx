import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import SignoutButton from "@/app/signout-button";
import {getQuizOfChapterId} from "@/modules/quiz/apiServices";

const getSession = async () => {
    return await getServerSession(authOptions);
}

const _getQuiz = async () => {
    try{
        const quiz: Quiz = await getQuizOfChapterId({chapterId: "1", quizId: "64cd2a4e3670d05612c7b5d1"});
        return quiz;
    } catch (e) {
        console.log("error", (e as Error).message);
    }
}

const _getQuiz2 = async () => {
    try{
        const quiz: Quiz = await getQuizOfChapterId({chapterId: "1", quizId: "64cd2a4e3670d05612c7b5d2"});
        return quiz;
    } catch (e) {
        console.log("error", (e as Error).message);
    }
}

const Home = async () => {
    const session = await getSession();
   const quiz = await _getQuiz();
    const quiz2 = await _getQuiz2();
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
                            {JSON.stringify(quiz)}
                            {JSON.stringify(quiz2)}
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
