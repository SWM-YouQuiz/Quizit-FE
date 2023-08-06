import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import {redirect} from "next/navigation";

const getSession = async () => {
    return await getServerSession(authOptions);
}
const AuthLayout = async ({children}: {children: ReactNode}) => {
    const session = await getSession();

    if(session?.user.accessToken) {
        redirect("/");
    }

    return (
        <div className="flex-grow relative max-h-screen p-4">
            {children}
        </div>
    )
}

export default AuthLayout;