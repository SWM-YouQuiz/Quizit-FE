type Menu = {
    title: string,
    href: string
}

type Role = "admin" | "user";

type User = {
    id: string,
    username: string,
    nickname: string,
    image: string,
    role: Role,
    allowPush: boolean,
    dailyTarget: number,
    answerRate: number,
    createdDate: string,
    correctQuizIds: string[],
    incorrectQuizIds: string[],
    markedQuizIds: string[]
}
