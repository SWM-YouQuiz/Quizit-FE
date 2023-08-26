import {CodingCharacter} from "@/components/character";

const Ready = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <CodingCharacter className="mt-40"/>
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">아직 준비중인 페이지입니다!</div>
        </div>
    )
}

export default Ready;