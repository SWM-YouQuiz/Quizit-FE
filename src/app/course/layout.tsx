import {ReactNode} from "react";

const CourseLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className="flex-grow relative max-h-[calc(100dvh-2.5rem)]">
            {children}
        </div>
    )
}

export default CourseLayout;