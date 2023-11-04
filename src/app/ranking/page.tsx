import { Header } from "@/components/Header";
import { Alert } from "@/components/svgs";
import Carousel from "@/modules/ranking/components/Carousel";
import { Suspense } from "react";

const RankingPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">리더보드</div>
                <div className="hidden">
                    <Alert />
                </div>
            </Header>
            <div className="flex-grow flex flex-col justify-between pt-4 bg-secondary-50">
                <Suspense>
                    <BodyContainer />
                </Suspense>
            </div>
        </div>
    );
};

const BodyContainer = () => {
    return <Carousel />;
};

export default RankingPage;
