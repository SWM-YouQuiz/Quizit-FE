import Link from "next/link";
import {ReactNode} from "react";
import {cn} from "@/util/tailwind";
import {headers} from "next/headers";
import QuizIcon from "@/components/QuizIcon";
import CreateIcon from "@/components/CreateIcon";
import RankingIcon from "@/components/RankingIcon";
import ProfileIcon from "@/components/ProfileIcon";

const Navbar = () => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");
    console.log("pathname", pathname);
    return (
        <div className="sticky bottom-0 flex items-center h-16 justify-evenly bg-white rounded-t-2xl">
            <Icon href="/curriculum/mvp" title="퀴즈" pathname={pathname}>
                <QuizIcon/>
            </Icon>
            <Icon href="/create" title="생성" pathname={pathname}>
                <CreateIcon/>
            </Icon>
            <Icon href="/ranking" title="랭킹" pathname={pathname}>
                <RankingIcon/>
            </Icon>
            <Icon href="/profile" title="프로필" pathname={pathname}>
                <ProfileIcon/>
            </Icon>
        </div>
    )
}

type IconProps = {
    title: string,
    href: string,
    pathname: string | null,
    children: ReactNode
}
const Icon = ({title, href, children, pathname}: IconProps) => {
    const isActive = pathname === href;
    return (
        <Link href={href} className="flex-1 grid place-items-center space-y-0.5">
            <div className={isActive ? "fill-primary-800" : "fill-secondary-200"}>{children}</div>
            <div className={cn("text-[11px] font-bold", isActive ? "text-primary-800" : "text-secondary-200")}>{title}</div>
        </Link>
    )
}

export default Navbar;