import Item from "@/modules/profile/components/Item";
import MarkedQuizIcon from "@/components/icons/MarkedQuizIcon";
import IncorrectQuizIcon from "@/components/icons/IncorrectQuizIcon";
import CorrectQuizIcon from "@/components/icons/CorrectQuizIcon";

export const menuData: Menu[] = [
    {
        title: "찜한 퀴즈",
        href: "profile/quizList/markedQuizIds",
        icon: <MarkedQuizIcon className="stroke-point1" />,
    },
    {
        title: "틀린 퀴즈",
        href: "profile/quizList/incorrectQuizIds",
        icon: <IncorrectQuizIcon className="stroke-point1" />,
    },
    {
        title: "맞힌 퀴즈",
        href: "profile/quizList/correctQuizIds",
        icon: <CorrectQuizIcon className="stroke-point1" />,
    },
];

const menuData2: Menu[] = [
    {
        title: "커뮤니티",
        href: "https://discord.gg/bpPuFJc3cM",
    },
    {
        title: "프로필 설정",
        href: "profile/mypage",
    },
];

const Menu = () => {
    return (
        <div>
            {menuData.map((menu) => (
                <Item key={`item-${menu.title}`} title={menu.title} href={menu.href} icon={menu.icon} />
            ))}
            <div className="border-t border-secondary-100 mt-5" />
            {menuData2.map((menu) => (
                <Item key={`item-${menu.title}`} title={menu.title} href={menu.href} icon={menu.icon} />
            ))}
        </div>
    );
};

export default Menu;
