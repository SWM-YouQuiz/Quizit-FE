"use client";
import QuizCard from "@/modules/profile/components/QuizCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuiz } from "@/modules/quiz/serverApiActions";
import { useContext } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useIntersectionObserver } from "@/modules/profile/hooks/useIntersectionObserver";

const QuizList = ({ quizIds, group }: { quizIds: string[]; group: keyof UserInfo }) => {
    const { accessToken, user } = useContext(QuizContext);
    const { data, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage } = useInfiniteQuery({
        queryKey: ["quizzes"],
        queryFn: async ({ pageParam }) => [await getQuiz({ quizId: quizIds[pageParam], accessToken })],
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

    // 커스텀 훅에 hasNextPage와 fetchNextPage를 넣어 setTarget을 받아옵니다.
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
