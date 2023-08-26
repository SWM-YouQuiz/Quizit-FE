import {ReactNode} from "react";
import {Alert} from "@/components/svgs";
import {Header} from "@/components/Header";
import Navbar from "@/components/Navbar";

const CourseLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow relative max-h-[calc(100dvh)]">
            {children}
            <Navbar/>
        </div>
    )
}

export default CourseLayout;