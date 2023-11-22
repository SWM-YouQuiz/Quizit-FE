import { Header } from "@/components/Header";
import { BackArrow, Filter } from "@/components/svgs";
import Link from "next/link";
import MotionDiv from "@/lib/animation/MotionDiv";
import React, { Suspense } from "react";
import BodyContainer, { ChapterTitle } from "@/app/curriculum/[curriculumId]/[courseId]/body-container";

const Chapter = ({ params }: { params: { curriculumId: string; courseId: string } }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col bg-white">
                <Header>
                    <Link href={`/curriculum/${params.curriculumId}`} shallow={true}>
                        <BackArrow />
                    </Link>
                    <Suspense>
                        <ChapterTitle courseId={params.courseId} />
                    </Suspense>
                    <Link href="/curriculum/filter">
                        <Filter />
                    </Link>
                </Header>
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
