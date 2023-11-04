import { getCourses, getCurriculum } from "@/modules/curriculum/serverApiActions";
import { Header } from "@/components/Header";
import { BackArrow, Filter } from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";

import MotionDiv from "@/lib/animation/MotionDiv";
import React, { Suspense } from "react";

const Course = async ({ params }: { params: { curriculumId: string } }) => {
    const courses = await getCourses({ curriculumId: params.curriculumId });

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
                <BodyContainer courses={courses} />
            </MotionDiv>
        </div>
    );
};

export default Course;

const CourseTitle = async ({ curriculumId }: { curriculumId: string }) => {
    const curriculum = await getCurriculum({ id: curriculumId });

    return <div className="font-bold">{curriculum.title}</div>;
};

const BodyContainer = ({ courses }: { courses: Course[] }) => (
    <div className="space-y-4">
        {courses.map(({ id, title, image, curriculumId }) => (
            <Card key={id} id={id} type="course" href={`${curriculumId}/${id}`} alt={title} imageUrl={image} path={title} title={title} />
        ))}
    </div>
);
