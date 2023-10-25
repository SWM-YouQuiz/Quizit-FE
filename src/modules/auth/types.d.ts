type RegisterInputs = {
    username: string
    password: string
    passwordComfirm: string
    email: string
    allowPush: boolean
}

type UserInfo = {
    "id": string,
    "username": string,
    "email": string,
    "image": string,
    "level": number,
    "role": "USER" | "ADMIN",
    provider: string,
    "allowPush": boolean,
    "dailyTarget": number,
    "answerRate": number,
    "createdDate": string,
    "correctQuizIds": string[],
    "incorrectQuizIds": string[],
    "markedQuizIds": string[]
}