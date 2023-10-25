import {getCourses, getCurriculums} from "@/modules/curriculum/serverApiActions";
import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";
import Card from "@/modules/curriculum/components/Card";
import HeaderContainer from "@/app/curriculum/header-container";
import MotionDiv from "@/lib/animation/MotionDiv";

const _getCourses = async (curriculums: Curriculum[]) => {
    const courses2d: Course[][] = await Promise.all(
        curriculums.map(curriculum => getCourses({curriculumId: curriculum.id}))
    )

    return courses2d;
}
const Curriculum = async () => {
    const curriculums = await getCurriculums();
    const courses = await _getCourses(curriculums);

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">퀴즈</div>
                <div className="hidden">
                    <Alert/>
                </div>
            </Header>
            <MotionDiv className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <HeaderContainer />
                <BodyContainer curriculums={curriculums} courses={courses}/>
            </MotionDiv>
        </div>
    )
}

export default Curriculum;





const BodyContainer = ({curriculums, courses}: {curriculums: Curriculum[], courses: Course[][]}) => (
    <div className="space-y-4">
        <div className="mt-8 text-lg font-bold text-secondary-900">전체 커리큘럼</div>
        {
            curriculums.map(({id, title, image},idx) => (
                <Card
                    key={`curriculum-${id}`}
                    href={`curriculum/${id}`}
                    title={`총 ${courses[idx].length}개의 코스`}
                    imageUrl={image}
                    alt={title}
                    path={title}
                    id={id}
                    type="curriculum"
                />
            ))
        }
    </div>
)

