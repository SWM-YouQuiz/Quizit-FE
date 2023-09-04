"use client"
import Link from "next/link";
import {ReactNode} from "react";
import {cn} from "@/util/tailwind";
import QuizIcon from "@/components/icons/QuizIcon";
import CreateIcon from "@/components/icons/CreateIcon";
import RankingIcon from "@/components/icons/RankingIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import {usePathname} from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="sticky bottom-0 flex items-center justify-evenly bg-white rounded-t-2xl drop-shadow-2xl pt-2.5">
            <Icon href="/curriculum" title="퀴즈" pathname={pathname}>
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
    pathname: string,
    children: ReactNode
}
const Icon = ({title, href, children, pathname}: IconProps) => {
    const isActive = pathname.includes(href);
    return (
        <Link href={href} className="flex-1 grid place-items-center space-y-0.5 pb-[calc(env(safe-area-inset-bottom)+12px)]" replace={true}>
            <div className={isActive ? "fill-primary-800" : "fill-secondary-200"}>{children}</div>
            <div className={cn("text-[11px] font-bold", isActive ? "text-primary-800" : "text-secondary-200")}>{title}</div>
        </Link>
    )
}

export default Navbar;