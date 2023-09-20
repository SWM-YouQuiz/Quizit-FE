type RegisterInputs = {
    username: string
    password: string
    passwordComfirm: string
    nickname: string
    allowPush: boolean
}

type UserInfo = {
    "id": string,
    "username": string,
    "nickname": string,
    "image": string,
    "level": number,
    "role": "USER" | "ADMIN",
    "allowPush": boolean,
    "dailyTarget": number,
    "answerRate": number,
    "createdDate": string,
    "correctQuizIds": string[],
    "incorrectQuizIds": string[],
    "markedQuizIds": string[]
}