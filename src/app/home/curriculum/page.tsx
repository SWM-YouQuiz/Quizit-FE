
type Curriculum = {
    id: string,
    name: string
}
const getCurriculum = (): Curriculum[] => {
    return [
        {
            id: "1",
            name: "네이버"
        },
        {
            id: "2",
            name: "카카오"
        },
        {
            id: "3",
            name: "라인"
        },
        {
            id: "4",
            name: "쿠팡"
        },
        {
            id: "5",
            name: "우아한 형제들"
        },
        {
            id: "6",
            name: "당근 마켓"
        },
        {
            id: "7",
            name: "비바리퍼블리카"
        }
    ]
}
const Curriculum = () => {
    const curriculums = getCurriculum();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {
                curriculums.map((curriculum: Curriculum) => (
                    <div key={`curriculum-${curriculum.id}`} className="w-40 h-40 bg-gray-300 place-content-center">
                        <p className="text-center">{curriculum.name}</p>
                    </div>
                ))
            }
        </div>


    )
}

export default Curriculum;