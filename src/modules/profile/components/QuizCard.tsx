"use client";
import Link from "next/link";
import { cn } from "@/util/tailwind";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Heartbutton from "@/components/Heartbutton";
import { calculateDateDifference } from "@/util/etc";
import { QuizContext } from "@/lib/context/Context";
import { motion } from "framer-motion";
import { getChapter } from "@/modules/curriculum/serverApiActions";

type CardProps = {
    href?: string;
    className?: string;
    quiz: Quiz;
    userId: string;
};

const QuizCard = ({ href = "", quiz, className = "", userId }: CardProps) => {
    const { accessToken } = useContext(QuizContext);
    const [chapter, setChapter] = useState<Chapter>();

    useEffect(() => {
        if (quiz) {
            _getChapter(quiz.chapterId);
        }
    }, [quiz]);

    const _getChapter = async (chapterId: string) => {
        try {
            const chapter = await getChapter({ chapterId, accessToken });

            setChapter(chapter);
        } catch (e) {
            return;
        }
    };

    if (!quiz) return null;

    const question = quiz.question.replace(/(```|\\`\\`\\`)[\s\S]*?\1/g, "");

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.95 }}>
            <Link href={href} className={cn("flex flex-col justify-between rounded-xl drop-shadow p-4 bg-white space-y-4", className)} scroll={true}>
                <div className="flex space-x-2">
                    <div>
                        <div className="grid place-items-center border border-neutral-100 w-12 h-12 rounded-full">
                            {chapter && <Image src={chapter.image} width={48} height={48} alt={"퀴즈가 포함된 코스 로고"} />}
                        </div>
                    </div>
                    <div className="flex-grow space-y-3">
                        <div className="flex items-start">
                            <div className="flex-grow flex flex-col justify-evenly">
                                <div className="text-secondary-400 text-[13px]">{chapter?.description}</div>
                                <div className="font-semibold text-sm">{question}</div>
                            </div>
                            <Heartbutton quizId={quiz.id} markedUserIds={quiz.markedUserIds} userId={userId} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="text-secondary-400 text-[13px]">
                        {calculateDateDifference(new Date(), new Date(quiz.createdDate))}
                        일전
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default QuizCard;
