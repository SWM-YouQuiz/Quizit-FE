import { getChapters, getCourses } from "@/modules/curriculum/serverApiActions";
import { Header } from "@/components/Header";
import { Filter } from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";
import Options from "@/modules/curriculum/components/Options";
import OptionSheetContainer from "@/modules/curriculum/components/OptionSheetContainer";
import MotionDiv from "@/lib/animation/MotionDiv";
import BackButton from "@/components/BackButton";
import React from "react";
import { HydratedChapters } from "@/app/curriculum/[curriculumId]/[courseId]/hydrated-chapter";

const Chapter = async ({ params }: { params: { curriculumId: string; courseId: string } }) => {
    const chapters = await getChapters({ courseId: params.courseId });
    const courses = await getCourses({ curriculumId: params.curriculumId });

    const course = courses.find((course) => course.id === params.courseId) as Course;
    const sortedChapters = chapters.sort((a, b) => parseInt(a.index) - parseInt(b.index));

    return (
        <div className="flex flex-col h-full">
            <Header>
                <BackButton />
                <div className="font-bold">{course.title}</div>
                <Link href="/curriculum/filter">
                    <Filter />
                </Link>
            </Header>
            <MotionDiv className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <BodyContainer chapters={chapters} curriculumId={params.curriculumId} />
            </MotionDiv>
        </div>
    );
};

export default Chapter;

type BodyContainerProps = {
    chapters: Chapter[];
    curriculumId: string;
};
const BodyContainer = ({ chapters, curriculumId }: BodyContainerProps) => (
    <div className="w-full space-y-4">
        <OptionSheetContainer>
            {chapters.map(({ id, description, courseId, document, index, image }, idx) => (
                <HydratedChapters key={`chapter-${id}`} chapterId={id}>
                    <Card
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
                </HydratedChapters>
            ))}
        </OptionSheetContainer>
    </div>
);
