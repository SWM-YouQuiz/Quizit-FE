"use client"
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";
import {Session} from "next-auth";

export const NextAuthProvider = ({ session=null, children }: {session: Session | null, children: ReactNode}) => {
    return (
        <SessionProvider session={session} basePath="/api/nextAuth">
            {children}
        </SessionProvider>
    )
};