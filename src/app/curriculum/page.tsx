import { Header } from "@/components/Header";
import { Alert } from "@/components/svgs";
import HeaderContainer from "@/app/curriculum/header-container";
import MotionDiv from "@/lib/animation/MotionDiv";
import BodyContainer from "@/app/curriculum/body-container";

const Curriculum = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">퀴즈</div>
                <div className="hidden">
                    <Alert />
                </div>
            </Header>
            <MotionDiv className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <HeaderContainer />
                <BodyContainer />
            </MotionDiv>
        </div>
    );
};

export default Curriculum;
