"use client";
import QuizCard from "@/modules/profile/components/QuizCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuiz } from "@/modules/quiz/serverApiActions";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useIntersectionObserver } from "@/modules/profile/hooks/useIntersectionObserver";
import { getUser } from "@/modules/profile/serverApiActions";

const QuizList = ({ group }: { group: keyof UserInfo }) => {
    const { accessToken, dispatch } = useContext(QuizContext);
    const [user, setUser] = useState<UserInfo | undefined>();

    useEffect(() => {
        if (!user) {
            getUser({ accessToken, cache: "no-store" }).then((fetchedUser) => {
                setUser(fetchedUser);
                if (dispatch) {
                    dispatch({ type: "SET_USER", payload: fetchedUser });
                }
            });
        }
    }, [accessToken, dispatch, user]);

    const [quizIds, setQuizIds] = useState<string[]>([]);
    useEffect(() => {
        if (user) {
            setQuizIds(user[group] as string[]);
        }
    }, [user, group]);

    const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } = useInfiniteQuery({
        queryKey: ["quizList", group, quizIds],
        queryFn: async ({ pageParam }) => [await getQuiz({ quizId: quizIds[pageParam], accessToken })],
        enabled: !!quizIds.length,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.length === 0 ? undefined : nextPage;
        },
        select: (data) => ({
            pages: data?.pages.flatMap((page) => page),
            pageParams: data.pageParams,
        }),
    });

    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    });

    if (quizIds.length <= 0 || !user || !data) return null;

    return (
        <div className="space-y-6">
            {data.pages.map((quiz) => (
                <QuizCard key={quiz.id} href={`${group}/${quiz.id}`} quiz={quiz} userId={user.id} />
            ))}
            <div ref={setTarget} className="h-[1rem]" />
        </div>
    );
};

export default QuizList;
