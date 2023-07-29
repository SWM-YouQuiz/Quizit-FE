import {courseDummy} from "@/modules/course/courseDummy";
import Card from "@/app/course/[curriculumName]/card";


const getCourse = async (curriculumName: string) => {
    await new Promise((resolve) =>
        setTimeout(() => resolve(null), 2000)
    )
    return courseDummy[curriculumName];
}

const Course = async ({params}: {params: {curriculumName: string}}) => {
    const courses = await getCourse(params.curriculumName);

    return (
        <div className="flex flex-col w-full h-full">
            <HeaderContainer title={params.curriculumName}/>
            <BodyContainer courses={courses}/>
        </div>
    )
}

export default Course;

const HeaderContainer = ({title}: {title: string}) => (
    <div className="flex justify-between p-4">
        <Title title={title}/>
        <Filter />
    </div>
)

const Title = ({title}: {title: string}) => (
    <div className="text-3xl font-bold">
        {title}
    </div>
)

const Filter = () => (
    <div>
        필터
    </div>
)

const BodyContainer = ({courses}: {courses: Course[]}) => (
    <div className="place-items-center overflow-y-scroll p-4
     grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-5">
        {
            courses.map(({id, logo, name},idx) => (
                <Card key={`course-${id}-${idx}`} logo={logo} name={name}/>
            ))
        }
    </div>
)