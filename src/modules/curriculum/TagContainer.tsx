"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useContext } from "react";
import MarkedQuizIcon from "@/components/icons/MarkedQuizIcon";
import UnsolvedQuizIcon from "@/components/icons/UnsolvedQuizIcon";
import IncorrectQuizIcon from "@/components/icons/IncorrectQuizIcon";
import Tag from "@/modules/curriculum/components/Tag";
import { QuizFilterContext, QuizFilterContextType } from "@/lib/context/Context";

const TagContainer = () => {
    const context = useContext<QuizFilterContextType>(QuizFilterContext);
    const router = useRouter();
    const { quizFilter, setQuizFilter } = context;

    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        const name = e.currentTarget.name as keyof QuizFilter;
        if (setQuizFilter) {
            setQuizFilter((prev) => ({
                ...prev,
                [name]: !prev[name],
            }));
        }
    };

    const handleCancelClick = () => {
        router.back();
    };

    return (
        <div className="space-x-3 flex">
            <Tag name="markedQuiz" text="" toggle={quizFilter["markedQuiz"]} handleToggle={handleToggle} icon={<MarkedQuizIcon />} />
            <Tag name="unsolvedQuiz" text="" toggle={quizFilter["unsolvedQuiz"]} handleToggle={handleToggle} icon={<UnsolvedQuizIcon />} />
            <Tag name="incorrectQuiz" text="" toggle={quizFilter["incorrectQuiz"]} handleToggle={handleToggle} icon={<IncorrectQuizIcon />} />
        </div>
    );
};

export default TagContainer;
