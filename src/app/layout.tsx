import './globals.css'
import {ReactNode} from "react";
import Head from "@/app/head";
import {NextAuthProvider} from "@/app/provider";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/modules/auth/auth";

export const metadata = {
    title: 'Quiz IT',
    description: 'Quiz IT',
}

const RootLayout = async ({children,}: { children: ReactNode }) => {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <Head />
            <body className="h-screen w-full flex flex-col">
                <NextAuthProvider session={session}>
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    )
}

export default RootLayout;