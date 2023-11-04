"use client";
import { getCourses, getCurriculums } from "@/modules/curriculum/serverApiActions";
import Card from "@/modules/curriculum/components/Card";
import { useContext } from "react";
import { QuizContext } from "@/lib/context/Context";
import { useQuery } from "@tanstack/react-query";
import Curriculum from "@/app/curriculum/page";

const _getCourses = async (curriculums: Curriculum[] | undefined, accessToken: string) => {
    if (curriculums === undefined) return undefined;
    const courses2d: Course[][] = await Promise.all(
        curriculums.map((curriculum) =>
            getCourses({
                curriculumId: curriculum.id,
                accessToken,
            }),
        ),
    );

    return courses2d;
};

const BodyContainer = () => {
    const { accessToken } = useContext(QuizContext);
    const { data: curriculums, isLoading: isCurriculumsLoading } = useQuery({
        queryKey: ["curriculums"],
        queryFn: () => getCurriculums({ accessToken }),
        staleTime: 1000 * 60 * 60,
    });

    const { data: courses, isLoading: isCoursesLoading } = useQuery({
        queryKey: ["course2d"],
        queryFn: () => _getCourses(curriculums, accessToken),
        staleTime: 1000 * 60 * 60,
        enabled: !!curriculums,
    });

    if (isCurriculumsLoading || !curriculums) return null;

    return (
        <div className="space-y-4">
            <div className="mt-8 text-lg font-bold text-secondary-900">전체 커리큘럼</div>
            {curriculums.map(({ id, title, image }, idx) => (
                <Card
                    key={id}
                    href={`curriculum/${id}`}
                    title={courses ? `총 ${courses[idx].length}개의 코스` : "총 -개의 코스"}
                    imageUrl={image}
                    alt={title}
                    path={title}
                    id={id}
                    type="curriculum"
                />
            ))}
        </div>
    );
};

export default BodyContainer;
