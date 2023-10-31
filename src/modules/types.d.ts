type Token = {
    accessToken: string;
    refreshToken: string;
};

type QuizContextState = {
    user: UserInfo | undefined;
    accessToken: string;
};

type QuizContextAction = { type: "SET_USER"; payload: UserInfo } | { type: "SET_TOKEN"; payload: string };

type AccessToken = {
    accessToken: string;
};
