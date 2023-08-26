import {getCourses} from "@/modules/curriculum/serverApiActions";
import {cn} from "@/util/tailwind";
import {Header} from "@/components/Header";
import {Alert, BackArrow, Filter} from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";

const curriculumId: string = "mvp";
const Course = async ({params}: {params: {curriculumId: string}}) => {
    const courses = await getCourses({curriculumId: 'mvp'});

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href="/">
                    <BackArrow/>
                </Link>
                <div className="font-bold">mvp</div>
                <Filter/>
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
            courses.map(({id, title, image}) => (
                <Card
                    key={`course-${id}`}
                    href={`${curriculumId}/${id}/${title}`}
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