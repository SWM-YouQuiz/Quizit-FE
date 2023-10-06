"use client"
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getUser } from "@/modules/profile/serverApiActions";
import QuizCard from "@/modules/profile/components/QuizCard";

const QuizList = ({ group }: { group: keyof UserInfo }) => {
    const refetchAmount = 6;
    const [quizIds, setQuizIds] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState("");
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView();

    const refetch = async () => {
        console.log("hasmore",hasMore)
        if (!hasMore) return;

        if (page * refetchAmount >= quizIds.length) {
            setHasMore(false);
            console.log("hasmore false")
            return;
        }
        setPage(prev => prev + 1);
    };

    const getGroupQuizIds = async () => {
        const user = await getUser();
        const quizIds = user[group] as string[];
        setQuizIds(quizIds);
        setUserId(user.id);
    };

    useEffect(() => {
        if (inView && quizIds.length > 0) {
            refetch();
        }
    }, [inView, quizIds]);

    useEffect(() => {
        getGroupQuizIds();
    }, []);

    return (
        <div className="space-y-6">
            {quizIds
                .slice(0, page * refetchAmount)
                .map(quizId => (
                    <QuizCard key={quizId} quizId={quizId} userId={userId} />
                ))}
            {hasMore && <div ref={ref}></div>}
        </div>
    );
};

export default QuizList;