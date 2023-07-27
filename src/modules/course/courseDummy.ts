import {ReactIcon} from "@/components/svgs";


export const mvpCourseDummy: Course[] = [
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    },
    {
        id: 1,
        name: 'react',
        logo: ReactIcon
    }
]

type CourseDummy = {
    [curriculumName: string]: Course[]
}
export const courseDummy: CourseDummy = {
    mvp: mvpCourseDummy
}