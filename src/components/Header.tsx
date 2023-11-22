import { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
    return <div className="flex justify-between px-5 py-2.5 text-xl bg-white drop-shadow-sm">{children}</div>;
};
