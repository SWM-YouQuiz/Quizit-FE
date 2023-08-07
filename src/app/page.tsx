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

const Home = async () => {
    const session = await getSession();

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
                    </>
                ) : (
                    <Link href="/auth/login">go to Login</Link>
                )
            }
        </main>
    )
}

export default Home;
