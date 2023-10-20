import {ReactNode} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/modules/auth/auth";
import {redirect} from "next/navigation";

const AuthLayout = async ({children}: {children: ReactNode}) => {
    return (
        <div className="flex-grow relative max-h-screen p-4 bg-primary-900">
            {children}
        </div>
    )
}

export default AuthLayout;