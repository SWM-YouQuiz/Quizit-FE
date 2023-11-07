import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    return <div className="flex-grow relative h-screen p-4 bg-primary-900">{children}</div>;
};

export default AuthLayout;
