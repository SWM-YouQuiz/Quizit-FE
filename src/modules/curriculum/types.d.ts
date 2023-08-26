type Course = {
    id: string,
    title: string,
    image: string
}

type Chapter = {
    id: string,
    description: string,
    courseId: string
}

type CardOption = {
    title: string,
    onClick: () => void
}