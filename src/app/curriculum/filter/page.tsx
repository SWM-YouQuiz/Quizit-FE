"use client"
import {MouseEventHandler, ReactNode, useContext} from "react";
import {
    QuizFilterContext,
    QuizFilterContextType
} from "@/modules/curriculum/Context";
import {Header} from "@/components/Header";
import {motion} from "framer-motion";
import {BackArrow, Cancel, Check} from "@/components/svgs";
import {useRouter} from "next/navigation";
import {cn} from "@/util/tailwind";
import AllQuizIcon from "@/components/icons/AllQuizIcon";
import MarkedQuizIcon from "@/components/icons/MarkedQuizIcon";
import UnsolvedQuizIcon from "@/components/icons/UnsolvedQuizIcon";
import IncorrectQuizIcon from "@/components/icons/IncorrectQuizIcon";

const Filter = () => {
    const context = useContext<QuizFilterContextType>(QuizFilterContext);

    return (
        <BodyContainer context={context}/>
    )
}

const BodyContainer = ({context}: {context: QuizFilterContextType}) => {
    const {quizFilter, setQuizFilter} = context;
    const router = useRouter();

    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
        const name = e.currentTarget.name as keyof QuizFilter;
        if (setQuizFilter) {
            setQuizFilter(prev => ({
                ...prev,
                [name]: !prev[name]
            }))
        }
    }

    const handleCancelClick = () => {
        router.back();
    }

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div/>
                <div className="font-bold">필터 옵션</div>
                <button type="button" onClick={handleCancelClick}>
                    <Cancel/>
                </button>
            </Header>
            <div className="flex-grow bg-white overflow-y-auto p-5">
                <div className="space-y-3 flex flex-col">
                    <p className="text-base text-secondary-900 leading-[19px] font-bold">퀴즈 분류</p>
                    <ToggleButton
                        name="markedQuiz"
                        text="찜 한 퀴즈만 보여주기"
                        toggle={quizFilter["markedQuiz"]}
                        handleToggle={handleToggle}
                        icon={<MarkedQuizIcon />}
                    />
                    <ToggleButton
                        name="unsolvedQuiz"
                        text="안 푼 퀴즈만 보여주기"
                        toggle={quizFilter["unsolvedQuiz"]}
                        handleToggle={handleToggle}
                        icon={<UnsolvedQuizIcon />}
                    />
                    <ToggleButton
                        name="incorrectQuiz"
                        text="틀린 퀴즈만 보여주기"
                        toggle={quizFilter["incorrectQuiz"]}
                        handleToggle={handleToggle}
                        icon={<IncorrectQuizIcon />}
                    />
                </div>
            </div>
        </div>
    )
}

type ToggleButton = {
    name: keyof QuizFilter,
    toggle: boolean,
    handleToggle: MouseEventHandler<HTMLButtonElement>,
    text: string,
    icon: ReactNode,
}
const ToggleButton = ({name, toggle, handleToggle, text, icon}: ToggleButton) => {


    return (
        <motion.button
            type="button"
            name={name}
            onClick={handleToggle}
            className={
            cn("inner-border-2 h-12 rounded-lg text-secondary-900 flex justify-between px-3 items-center",
                toggle ? "inner-border-point1 text-point1 stroke-point1" : "inner-border-secondary-400 stroke-secondary-400 text-secondary-400"
            )}
            whileTap={{ scale: 0.95 }}
        >
            <div className="space-x-3 flex">
                {icon}
                <p className="text-center">{text}</p>
            </div>
            {toggle && <Check/>}
        </motion.button>
    )
}

export default Filter;