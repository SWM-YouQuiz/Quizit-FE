import Link from "next/link";
import {Rightarrow} from "@/components/svgs";
import LogoutButton from "@/modules/profile/components/LogoutButton";

const menuData: Menu[] = [
    {
        title: "내가 푼 퀴즈",
        href: "profile/quizList/correctQuizIds"
    },
    {
        title: "좋아요 한 퀴즈",
        href: ""
    },
    {
        title: "틀린 퀴즈",
        href: ""
    },
    {
        title: "프로필 설정",
        href: "profile/mypage"
    }
]

const Menu = () => {
    return (
        <div>
            {
                menuData.map(menu => (
                    <Item
                        key={`item-${menu.title}`}
                        title={menu.title}
                        href={menu.href}
                    />
                ))
            }
            <LogoutButton/>
        </div>
    )
}

export default Menu;

const Item = ({title, href}: Menu) => (
    <Link
        className="flex justify-between items-center h-[52px]"
        href={href}
    >
        <div className="text-[17px] text-secondary-900">{title}</div>
        <Rightarrow/>
    </Link>
)