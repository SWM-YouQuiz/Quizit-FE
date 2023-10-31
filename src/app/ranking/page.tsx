import { Header } from "@/components/Header";
import { Alert } from "@/components/svgs";
import Carousel from "@/modules/ranking/components/Carousel";
import { getCourses, getCurriculums } from "@/modules/curriculum/serverApiActions";

const _getCourses = async (curriculums: Curriculum[]) => {
    const courses2d: Course[][] = await Promise.all(curriculums.map((curriculum) => getCourses({ curriculumId: curriculum.id })));
    const courses = courses2d.reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);

    return courses;
};
const RankingPage = async () => {
    const curriculums = await getCurriculums();
    const courses = await _getCourses(curriculums);

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">리더보드</div>
                <div className="hidden">
                    <Alert />
                </div>
            </Header>
            <div className="flex-grow flex flex-col justify-between pt-4 bg-secondary-50">
                <Carousel courses={courses} />
            </div>
        </div>
    );
};

export default RankingPage;
