import Card from "@/app/curriculum/[curriculumId]/card";
import {getCourses} from "@/modules/curriculum/serverApiActions";

const curriculumId: string = "mvp";
const Course = async ({params}: {params: {curriculumId: string}}) => {
    const courses = await getCourses({curriculumId: 'mvp'});


    return (
        <div className="flex flex-col w-full h-full">
            <HeaderContainer title={curriculumId}/>
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
            courses.map(({id, title, image},idx) => (
                <Card
                    key={`course-${id}`}
                    title={title}
                    image={image}
                    id={id}
                    curriculumId={curriculumId}
                />
            ))
        }
    </div>
)