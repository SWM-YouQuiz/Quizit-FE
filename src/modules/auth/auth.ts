import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const URL = `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_API_URL}`

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: {label: "username", type: "username",},
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${URL}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })
                const user = await res.json();
                if(res.status === 200) {
                    return user
                }
                throw new Error("없는 사용자 이름이거나 잘못된 비밀번호 입니다.");
            },
        }),
    ],
    callbacks: {
        jwt: async function ({token, user}) {
            // token과 user값을 모두 제공해야 token이 유지됨
            if(user && user.accessToken && user.refreshToken) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
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
