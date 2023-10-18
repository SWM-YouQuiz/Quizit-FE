import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginApi} from "@/modules/auth/serverApiActions";
import {getUser, getUserFromId} from "@/modules/profile/serverApiActions";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: {label: "username", type: "username",},
                password: { label: "password", type: "password" },
                type: {label: "type", type: "type"}
            },
            async authorize(credentials) {
                if(!credentials) {
                    throw new Error("잘못된 요청입니다.");
                }
                if(credentials.type === "-1") {
                    try {
                        const json = await loginApi({body: credentials});
                        return json as any;
                    } catch {
                        throw new Error("없는 사용자 이름이거나 잘못된 비밀번호 입니다.");
                    }
                } else {
                    const accessToken = credentials.username;
                    const refreshToken = credentials.password;
                    const id = credentials.type

                    const user = await getUserFromId({id: id, accessToken: accessToken})

                    return {
                        accessToken, refreshToken, user
                    }
                }
            },
        }),
    ],
    callbacks: {
        jwt: async function ({token, user}) {
            // token과 user값을 모두 제공해야 token이 유지됨
            if(user && user.accessToken && user.refreshToken) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user.user;
            }
            return token;
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token and user id from a provider.
            return {
                ...session,
                user: {
                    ...token
                }
            }
        }
    }
};
