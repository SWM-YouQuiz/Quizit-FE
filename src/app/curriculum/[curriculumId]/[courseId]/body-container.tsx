"use client";

import { getChapters, getCourse } from "@/modules/curriculum/serverApiActions";
import OptionSheetContainer from "@/modules/curriculum/components/OptionSheetContainer";
import Card from "@/modules/curriculum/components/Card";
import Options from "@/modules/curriculum/components/Options";
import React, { useContext } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useQuery } from "@tanstack/react-query";

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
    const { data: chapters, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["chapters", courseId],
        queryFn: () => getChapters({ courseId, accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    if (!chapters) return null;
    const sortedChapters = chapters.sort((a, b) => parseInt(a.index) - parseInt(b.index));

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
                        id={id}
                        type="chapter"
                    >
                        <Options documentUrl={document} />
                    </Card>
                ))}
            </OptionSheetContainer>
        </div>
    );
};

export default BodyContainer;
