import Ready from "@/components/Ready";
import {Header} from "@/components/Header";
import Link from "next/link";
import {Alert, BackArrow, Filter} from "@/components/svgs";

const RankingPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">리더보드</div>
                <Alert/>
            </Header>
            <div className="flex-grow overflow-y-auto p-5">
                <Ready/>
            </div>
        </div>
    )
}

export default RankingPage;