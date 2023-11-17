import "./globals.css";
import { ReactNode } from "react";
import Head from "@/app/head";
import QuizContainer from "@/modules/quiz/components/QuizContext";
import QuizFilterContainer from "@/modules/curriculum/components/QuizFilterContainer";
import { AnimationWrapper } from "@/lib/animation/AnimationWrapper";
import { ReactQueryProvider } from "@/lib/reactQuery/provider";
import { HydratedProvider } from "@/lib/reactQuery/hydrated-provider";
import localFont from "next/font/local";

export const metadata = {
    title: "퀴즈잇",
    description: "퀴즈잇(Quizit): 퀴즈로 지식을 잇다.",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        viewportFit: "cover",
    },
};

const font = localFont({
    src: [
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../util/font/PretendardVariable.woff2",
            weight: "900",
            style: "normal",
        },
    ],
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <html lang="ko" className={`overscroll-none ${font.className}`}>
            <Head />
            <body className="h-screen w-full flex flex-col bg-secondary-50">
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
