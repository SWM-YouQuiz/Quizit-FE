import {ReactNode} from "react";
import {Alert} from "@/components/svgs";
import {Header} from "@/components/Header";
import Navbar from "@/components/Navbar";

const CreateLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow relative max-h-[calc(100dvh-64px)]">
            {children}
            <Navbar/>
        </div>
    )
}

export default CreateLayout;