import {getServerSession, NextAuthOptions} from "next-auth";

export async function authenticateSession(authOptions: NextAuthOptions) {
    const session = await getServerSession(authOptions);
    if(!session) {
        console.log("session is null!!", session)
        throw new Error('401');
    }
    return session;
}