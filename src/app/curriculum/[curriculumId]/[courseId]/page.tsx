import { getChapters, getCourse } from "@/modules/curriculum/serverApiActions";
import { Header } from "@/components/Header";
import { BackArrow, Filter } from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";
import Options from "@/modules/curriculum/components/Options";
import OptionSheetContainer from "@/modules/curriculum/components/OptionSheetContainer";
import MotionDiv from "@/lib/animation/MotionDiv";
import React, { Suspense } from "react";
import TagContainer from "@/modules/curriculum/TagContainer";

const Chapter = ({ params }: { params: { curriculumId: string; courseId: string } }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col">
                <Header>
                    <Link href={`/curriculum/${params.curriculumId}`}>
                        <BackArrow />
                    </Link>
                    <Suspense>
                        <ChapterTitle courseId={params.courseId} />
                    </Suspense>
                    <Link href="/curriculum/filter">
                        <Filter />
                    </Link>
                </Header>
                <TagContainer />
            </div>
            <MotionDiv className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <Suspense>
                    <BodyContainer curriculumId={params.curriculumId} courseId={params.courseId} />
                </Suspense>
            </MotionDiv>
        </div>
    );
};

export default Chapter;

const ChapterTitle = async ({ courseId }: { courseId: string }) => {
    const course = await getCourse({ id: courseId });

    return <div className="font-bold">{course.title}</div>;
};

type BodyContainerProps = {
    courseId: string;
    curriculumId: string;
};
const BodyContainer = async ({ courseId, curriculumId }: BodyContainerProps) => {
    const chapters = await getChapters({ courseId: courseId });
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
