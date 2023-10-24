import {getCurriculums} from "@/modules/curriculum/serverApiActions";
import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";
import Card from "@/modules/curriculum/components/Card";
import HeaderContainer from "@/app/curriculum/header-container";
import MotionDiv from "@/lib/animation/MotionDiv";

const Curriculum = async () => {
    const curriculums = await getCurriculums();

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
                <BodyContainer curriculums={curriculums}/>
            </MotionDiv>
        </div>
    )
}

export default Curriculum;





const BodyContainer = ({curriculums}: {curriculums: Curriculum[]}) => (
    <div className="space-y-4">
        <div className="mt-8 text-lg font-bold text-secondary-900">전체 커리큘럼</div>
        {
            curriculums.map(({id, title, image},idx) => (
                <Card
                    key={`curriculum-${id}`}
                    href={`curriculum/${id}`}
                    title={`총 6개의 코스`}
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

