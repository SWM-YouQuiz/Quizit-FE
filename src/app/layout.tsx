import "./globals.css";
import { ReactNode } from "react";
import Head from "@/app/head";
import QuizContainer from "@/modules/quiz/components/QuizContext";
import QuizFilterContainer from "@/modules/curriculum/components/QuizFilterContainer";
import { AnimationWrapper } from "@/lib/animation/AnimationWrapper";
import { ReactQueryProvider } from "@/lib/reactQuery/provider";
import { HydratedProvider } from "@/lib/reactQuery/hydrated-provider";

export const metadata = {
    title: "퀴즈잇(Quizit)",
    description: "퀴즈잇(Quizit): 퀴즈로 지식을 잇다.",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        viewportFit: "cover",
    },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <html lang="ko" className="overscroll-none">
            <Head />
            <body className="h-screen w-full flex flex-col">
                <ReactQueryProvider>
                    <QuizContainer>
                        <QuizFilterContainer>
                            <HydratedProvider>
                                <AnimationWrapper>{children}</AnimationWrapper>
                            </HydratedProvider>
                        </QuizFilterContainer>
                    </QuizContainer>
                </ReactQueryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
