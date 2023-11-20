"use client";
import QuizCard from "@/modules/profile/components/QuizCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuizIds } from "@/modules/quiz/serverApiActions";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "@/lib/context/Context";
import { getUser } from "@/modules/profile/serverApiActions";
import { useInView } from "react-intersection-observer";
import getQueryClient from "@/lib/reactQuery/get-query-client";

const QuizList = ({ group }: { group: keyof UserInfo }) => {
    const { accessToken, dispatch } = useContext(QuizContext);
    const [user, setUser] = useState<UserInfo | undefined>();
    const [quizIds, setQuizIds] = useState<string[]>([]);
    const queryClient = getQueryClient();

    useEffect(() => {
        if (!user) {
            getUser({ accessToken, cache: "no-store" }).then((fetchedUser) => {
                setUser(fetchedUser);
                setQuizIds(fetchedUser[group] as string[]);
                queryClient.invalidateQueries({ queryKey: ["quizList", group] });
                if (dispatch) {
                    dispatch({ type: "SET_USER", payload: fetchedUser });
                }
            });
        }
    }, [accessToken, dispatch, user]);

    const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } = useInfiniteQuery({
        queryKey: ["quizList", group],
        queryFn: async ({ pageParam = 0 }) => await getQuizIds({ quizIds: quizIds, accessToken, page: pageParam, size: 3 }),
        enabled: !!quizIds.length,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length;
            return nextPage < quizIds.length ? nextPage : undefined;
        },
    });
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    if (!data || !user) return null;

    return (
        <div className="space-y-6">
            {data.pages.map((page, i) => page.map((quiz) => <QuizCard key={quiz.id} href={`${group}/${quiz.id}`} quiz={quiz} userId={user.id} />))}
            <div ref={ref} className="h-[1rem]" />
        </div>
    );
};

export default QuizList;
