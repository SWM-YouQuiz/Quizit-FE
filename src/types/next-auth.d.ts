import NextAuth, {DefaultSession} from "next-auth"

// interface User {
//     token: string,
//     name?: string | null,
//     email?: string | null
// }

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            token: string
        }
    }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        token: string
    }
}