import Link from "next/link";
import { Rightarrow } from "@/components/svgs";
import React, { ReactNode } from "react";

type Item = {
    title: string;
    href: string;
    icon?: ReactNode;
    children?: ReactNode;
};
const Item = ({ title, href, icon, children }: Item) => (
    <Link className="flex justify-between items-center h-[52px] bg-white px-5" href={href} prefetch={false}>
        <div className="flex space-x-2">
            {icon && icon}
            <div className="text-[17px] text-secondary-900">{title}</div>
        </div>

        {children ? children : <Rightarrow />}
    </Link>
);

export default Item;
