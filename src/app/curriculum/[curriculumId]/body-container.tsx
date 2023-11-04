"use client";

import { getCourseProgress, getCourses, getCurriculum } from "@/modules/curriculum/serverApiActions";
import Card from "@/modules/curriculum/components/Card";
import React, { useContext } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useQueries, useQuery } from "@tanstack/react-query";

export const CourseTitle = ({ curriculumId }: { curriculumId: string }) => {
    const { accessToken } = useContext(QuizContext);
    const { data: curriculum, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["curriculum", curriculumId],
        queryFn: () => getCurriculum({ id: curriculumId, accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    if (!curriculum) return null;

    return <div className="font-bold">{curriculum.title}</div>;
};

const BodyContainer = ({ curriculumId }: { curriculumId: string }) => {
    const { accessToken } = useContext(QuizContext);
    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["courses", curriculumId],
        queryFn: () => getCourses({ curriculumId, accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    const progressQueries = useQueries({
        queries:
            courses?.map((course) => ({
                queryKey: ["course", course.id, "progress"],
                queryFn: () => getCourseProgress({ courseId: course.id, accessToken }),
                staleTime: 1000 * 60 * 60,
                enabled: !!courses,
            })) ?? [],
    });

    if (!courses) return null;

    return (
        <div className="space-y-4">
            {courses.map(({ id, title, image, curriculumId }, idx) => (
                <Card
                    key={id}
                    href={`${curriculumId}/${id}`}
                    alt={title}
                    imageUrl={image}
                    path={title}
                    title={title}
                    progress={progressQueries[idx]?.data}
                />
            ))}
        </div>
    );
};

export default BodyContainer;
