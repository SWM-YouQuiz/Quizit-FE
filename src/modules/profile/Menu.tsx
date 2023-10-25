import Item from "@/modules/profile/components/Item";

export const menuData: Menu[] = [
    {
        title: "찜 한 퀴즈",
        href: "profile/quizList/markedQuizIds"
    },
    {
        title: "틀린 퀴즈",
        href: "profile/quizList/incorrectQuizIds"
    },
    {
        title: "맞힌 퀴즈",
        href: "profile/quizList/correctQuizIds"
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
        </div>
    )
}

export default Menu;

