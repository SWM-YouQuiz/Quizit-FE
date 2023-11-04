"use client";

import { getChapterProgress, getChapters, getCourse } from "@/modules/curriculum/serverApiActions";
import OptionSheetContainer from "@/modules/curriculum/components/OptionSheetContainer";
import Card from "@/modules/curriculum/components/Card";
import Options from "@/modules/curriculum/components/Options";
import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useQueries, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/reactQuery/get-query-client";

export const ChapterTitle = ({ courseId }: { courseId: string }) => {
    const { accessToken } = useContext(QuizContext);
    const { data: course, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["course", courseId],
        queryFn: () => getCourse({ id: courseId, accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    if (!course) return null;

    return <div className="font-bold">{course.title}</div>;
};

type BodyContainerProps = {
    courseId: string;
    curriculumId: string;
};
const BodyContainer = ({ courseId, curriculumId }: BodyContainerProps) => {
    const { accessToken } = useContext(QuizContext);
    const [sortedChapters, setSortedChapters] = useState<Chapter[]>([]);
    const queryClient = getQueryClient();
    const { data: chapters, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["chapters", courseId],
        queryFn: () => getChapters({ courseId, accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    useEffect(() => {
        if (chapters) {
            const sorted = chapters.sort((a, b) => parseInt(a.index) - parseInt(b.index));
            setSortedChapters(sorted);
        }
    }, [chapters]);

    const progressQueries = useQueries({
        queries: sortedChapters.map((chapter) => ({
            queryKey: ["chapter", chapter.id, "progress"],
            queryFn: () => getChapterProgress({ chapterId: chapter.id, accessToken }),
            staleTime: 1000 * 60 * 60,
            enabled: sortedChapters.length > 0,
        })),
    });

    if (!sortedChapters || sortedChapters.length === 0) return null;

    return (
        <div className="w-full space-y-4">
            <OptionSheetContainer>
                {sortedChapters.map(({ id, description, courseId, document, index, image }, idx) => (
                    <Card
                        key={id}
                        href={`/quiz/${curriculumId}/${courseId}/${id}`}
                        alt={courseId}
                        imageUrl={image}
                        path={`Chapter ${idx + 1}`}
                        title={description}
                        progress={progressQueries[idx]?.data}
                    >
                        <Options documentUrl={document} />
                    </Card>
                ))}
            </OptionSheetContainer>
        </div>
    );
};

export default BodyContainer;
