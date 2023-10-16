import {getCourses, getCurriculums} from "@/modules/curriculum/serverApiActions";
import {cn} from "@/util/tailwind";
import {Header} from "@/components/Header";
import {Alert, BackArrow, Filter} from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";
const Course = async ({params}: {params: {curriculumId: string}}) => {
    const courses = await getCourses({curriculumId: params.curriculumId});
    const curriculums = await getCurriculums();

    const curriculum = curriculums.find(curriculum => curriculum.id === params.curriculumId) as Curriculum;

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/curriculum">
                    <BackArrow/>
                </Link>
                <div className="font-bold">{curriculum.title}</div>
                <Link href="/curriculum/filter">
                    <Filter/>
                </Link>
            </Header>
            <div className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <BodyContainer courses={courses}/>
            </div>
        </div>
    )
}

export default Course;

const BodyContainer = ({courses}: {courses: Course[]}) => (
    <div className="space-y-4">
        {
            courses.map(({id, title, image, curriculumId}) => (
                <Card
                    key={`course-${id}`}
                    href={`${curriculumId}/${id}`}
                    alt={title}
                    imageUrl={image}
                    path={title}
                    solvedQuizzes={50}
                    allQuizzes={400}
                    title={title}
                />
            ))
        }
    </div>
)