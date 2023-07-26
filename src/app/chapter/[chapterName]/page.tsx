import {ReactIcon} from "@/components/svgs";
import {Card} from "@/app/chapter/[chapterName]/card";
import {chapterDummy} from "@/modules/chapter/chapterDummy";


const getChapter = async (chapterName: string) => {
    await new Promise((resolve) =>
        setTimeout(() => resolve(null), 2000)
    )
    return chapterDummy[chapterName];
}

const Chapter = async ({params}: {params: {chapterName: string}}) => {
    const chapters = await getChapter(params.chapterName);
    return (
        <div className="flex flex-col w-full max-h-full">
            <HeaderContainer />
            <BodyContainer chapters={chapters}/>
        </div>
    )
}

const HeaderContainer = () => (
    <div className="flex h-20 justify-center">
        <ReactIcon />
    </div>
)

const BodyContainer = ({chapters}: {chapters: Chapter[]}) => {
    return (
        <div className="flex-grow p-4 space-y-2.5 mt-4 overflow-y-auto">
            {
                chapters.map((chapter, idx) => (
                    <Card key={`chapter-${chapter.name}-${idx}`} chapter={chapter}/>
                ))
            }
        </div>
    )
}

export default Chapter;