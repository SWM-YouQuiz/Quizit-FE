
import {getCourses, getCurriculums} from "@/modules/curriculum/serverApiActions";
import {cn} from "@/util/tailwind";
import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";
import Card from "@/modules/curriculum/components/Card";

const Curriculum = async () => {
    const curriculums = await getCurriculums();

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">퀴즈</div>
                <Alert/>
            </Header>
            <div className="flex-grow bg-secondary-50 overflow-y-auto p-5">
                <HeaderContainer title="커리큘럼"/>
                <BodyContainer curriculums={curriculums}/>
            </div>
        </div>
    )
}

export default Curriculum;

const HeaderContainer = ({title}: {title: string}) => (
    <div className="flex justify-between">
        <HeaderCard title={"내가 푼 퀴즈"} count={132} className="bg-primary-900 mr-3"/>
        <HeaderCard title={"내가 만든 퀴즈"} count={29} className="bg-point3"/>
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

const BodyContainer = ({curriculums}: {curriculums: Curriculum[]}) => (
    <div className="space-y-4">
        <div className="mt-8 text-lg font-bold text-secondary-900">전체 커리큘럼</div>
        {
            curriculums.map(({id, title, image},idx) => (
                <Card
                    key={`curriculum-${id}`}
                    href={`curriculum/${id}`}
                    title={`총 n개의 코스`}
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

