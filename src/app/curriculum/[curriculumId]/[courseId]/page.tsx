import {ReactIcon} from "@/components/svgs";
import {getChapters} from "@/modules/curriculum/serverApiActions";
import {Card} from "@/app/curriculum/[curriculumId]/[courseId]/card";

const Chapter = async ({params}: {params: {courseId: string, curriculumId: string}}) => {
    const chapters = await getChapters({curriculumId: params.curriculumId, courseId: params.courseId});
    return (
        <div className="flex flex-col w-full max-h-full">
            <HeaderContainer />
            <BodyContainer chapters={chapters}/>
        </div>
    )
}

const HeaderContainer = () => (
    <div className="flex my-4 h-20 justify-center">
        <ReactIcon />
    </div>
)

const BodyContainer = ({chapters}: {chapters: Chapter[]}) => {
    return (
        <div className="flex-grow p-4 space-y-2.5 overflow-y-auto">
            {
                chapters.map((chapter, idx) => (
                    <Card key={`chapter-${chapter.id}`} description={chapter.description} id={chapter.id} courseId={chapter.courseId}/>
                ))
            }
        </div>
    )
}

export default Chapter;