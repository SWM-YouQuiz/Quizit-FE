import Link from "next/link";
import Button from "@/components/ui/Button";

type NextButtonProps = {
    context: string,
    href: string,
    disable: boolean
}

const NextButton = ({context, href, disable}: NextButtonProps) => {
    return (
        <Link href={href} className="w-full" replace={true}>
            <Button context={context} disable={disable}/>
        </Link>
    )
}

export default NextButton;