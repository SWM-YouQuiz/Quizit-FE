import { Header } from "@/components/Header";
import { BackArrow, Filter } from "@/components/svgs";
import Link from "next/link";

import MotionDiv from "@/lib/animation/MotionDiv";
import React, { Suspense } from "react";
import BodyContainer, { CourseTitle } from "@/app/curriculum/[curriculumId]/body-container";

const Course = ({ params }: { params: { curriculumId: string } }) => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/curriculum">
                    <BackArrow />
                </Link>
                <Suspense>
                    <CourseTitle curriculumId={params.curriculumId} />
                </Suspense>
                <Link href="/curriculum/filter">
                    <Filter />
                </Link>
            </Header>
            <MotionDiv className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <BodyContainer curriculumId={params.curriculumId} />
            </MotionDiv>
        </div>
    );
};

export default Course;
