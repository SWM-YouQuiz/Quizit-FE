import type {NextAuthOptions, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch("https://reqres.in/api/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })
                const user = await res.json();
                if(res.status === 200) {
                    user.token = (Math.random() + 1).toString(36).substring(7);
                    return user
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async function ({token, user}) {
            return {
                ...token,
                ...user
            }
        },
        async session({ session, token, user }) {
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
