import Link from "next/link";
import {Rightarrow} from "@/components/svgs";

const menuData: Menu[] = [
    {
        title: "내가 푼 퀴즈",
        href: ""
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
        href: ""
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