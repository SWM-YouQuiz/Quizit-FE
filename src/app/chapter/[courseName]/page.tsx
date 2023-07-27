import {ReactIcon} from "@/components/svgs";
import {Card} from "@/app/chapter/[courseName]/card";
import {chapterDummy} from "@/modules/chapter/chapterDummy";


const getChapter = async (courseName: string) => {
    await new Promise((resolve) =>
        setTimeout(() => resolve(null), 2000)
    )
    return chapterDummy[courseName];
}

const Chapter = async ({params}: {params: {courseName: string}}) => {
    const chapters = await getChapter(params.courseName);
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
                    <Card key={`chapter-${chapter.name}-${idx}`} chapter={chapter}/>
                ))
            }
        </div>
    )
}

export default Chapter;