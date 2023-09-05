import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";
import Carousel from "@/modules/ranking/components/Carousel";
import RankingList from "@/modules/ranking/components/RankingList";

const RankingPage = () => {

    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">리더보드</div>
                <Alert/>
            </Header>
            <div className="flex-grow flex flex-col justify-between pt-4 space-y-6">
                <Carousel/>
                <RankingList/>
            </div>
        </div>
    )
}

export default RankingPage;