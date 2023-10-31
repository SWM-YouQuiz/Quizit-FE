import Link from "next/link";
import { Rightarrow } from "@/components/svgs";
import { ReactNode } from "react";

type Item = {
    title: string;
    href: string;
    children?: ReactNode;
};
const Item = ({ title, href, children }: Item) => (
    <Link className="flex justify-between items-center h-[52px] bg-white px-5" href={href} prefetch={false}>
        <div className="text-[17px] text-secondary-900">{title}</div>
        {children ? children : <Rightarrow />}
    </Link>
);

export default Item;
