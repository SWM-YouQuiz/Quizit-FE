import {getChapters, getCourses} from "@/modules/curriculum/serverApiActions";
import {cn} from "@/util/tailwind";
import {Header} from "@/components/Header";
import {Alert, BackArrow, Filter} from "@/components/svgs";
import Link from "next/link";
import Card from "@/modules/curriculum/components/Card";
import Options from "@/modules/curriculum/components/Options";
import OptionSheet from "@/modules/curriculum/components/OptionSheet";
import OptionSheetContainer from "@/modules/curriculum/components/OptionSheetContainer";
const Chapter = async ({params}: {params: {curriculumId: string, courseId: string}}) => {
    const chapters = await getChapters({courseId: params.courseId});
    const courses = await getCourses({curriculumId: params.curriculumId});

    const course = courses.find(course => course.id === params.courseId) as Course;

    return (
        <div className="flex flex-col h-full">
            <Header>
                <Link href={`/curriculum/${params.curriculumId}`} replace={true}>
                    <BackArrow/>
                </Link>
                <div className="font-bold">{course.title}</div>
                <Filter/>
            </Header>
            <div className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <BodyContainer
                    chapters={chapters}
                    courseTitle={course.title}
                    curriculumId={params.curriculumId}
                    courseId={params.courseId}
                />
            </div>
        </div>
    )
}

export default Chapter;

type BodyContainerProps = {
    chapters: Chapter[],
    courseTitle: string,
    curriculumId: string,
    courseId: string
}
const BodyContainer = ({chapters, courseTitle, curriculumId, courseId}: BodyContainerProps) => (
    <div className="w-full space-y-4">
        <OptionSheetContainer>
        {
            chapters.map(({id, description, courseId}, idx) => (
                    <Card
                        key={`chapter-${id}`}
                        href={`/quiz/${curriculumId}/${courseId}/${id}`}
                        alt={courseId}
                        imageUrl={`https://quizit-storage.s3.ap-northeast-2.amazonaws.com/${courseTitle}.png`}
                        path={`Chapter ${idx+1}`}
                        allQuizzes={100}
                        solvedQuizzes={40}
                        title={description}
                    >
                        <Options documentUrl="https://nextjs.org/docs/app/building-your-application/routing"/>
                    </Card>
                )
            )
        }
        </OptionSheetContainer>
    </div>
)