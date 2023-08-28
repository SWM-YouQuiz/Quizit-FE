
import {getCourses} from "@/modules/curriculum/serverApiActions";
import {cn} from "@/util/tailwind";
import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";
import Card from "@/modules/curriculum/components/Card";

const curriculumId: string = "mvp";
const Course = async ({params}: {params: {curriculumId: string}}) => {
    const courses = await getCourses({curriculumId: 'mvp'});


    return (
        <>
            <Header>
                <div className="font-bold">퀴즈</div>
                <Alert/>
            </Header>
            <div className="bg-bg-primary p-5">
                <div className="flex flex-col w-full h-full">
                    <HeaderContainer title={curriculumId}/>
                    <BodyContainer courses={courses}/>
                </div>
            </div>
        </>
    )
}

export default Course;

const HeaderContainer = ({title}: {title: string}) => (
    <div className="flex justify-between">
        <HeaderCard title={"내가 푼 퀴즈"} count={132} className="bg-purple mr-3"/>
        <HeaderCard title={"내가 만든 퀴즈"} count={29} className="bg-green"/>
    </div>
)

const HeaderCard = ({title, count, className=""}: {title: string, count: number, className?: string}) => (
    <div className={cn("flex flex-col w-full h-20 justify-between p-4 rounded-xl text-white", className)}>
        <div className="text-sm leading-[17px]">
            {title}
        </div>
        <div className="font-bold text-lg leading-[21px]">
            {count}&nbsp;개
        </div>
    </div>
)

const BodyContainer = ({courses}: {courses: Course[]}) => (
    <div className="place-items-center overflow-y-scroll p-4
     grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-5">
        {
            courses.map(({id, title, image},idx) => (
                <Card
                    key={`course-${id}`}
                    title={title}
                    imageUrl={image}
                    alt={title}
                    path={`${curriculumId}`}
                    allQuizzes={1000}
                    solvedQuizzes={200}
                />
            ))
        }
    </div>
)