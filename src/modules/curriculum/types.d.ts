type Course = {
    id: string,
    title: string,
    image: string,
    curriculumId: string
}

type Chapter = {
    id: string,
    description: string,
    courseId: string,
    document: string,
    image: string,
    index: string
}

type Curriculum = {
    id: string,
    title: string,
    image: string
}

type QuizFilter = {
    markedQuiz: boolean,
    incorrectQuiz: boolean,
    unsolvedQuiz: boolean
}

type Progress = {
    total: number,
    solved: number
}