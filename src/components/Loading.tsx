import {CodingCharacter} from "@/components/character";

const Loading = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <CodingCharacter className="mt-40"/>
            <div className="text-center text-secondary-800 text-lg mb-10 font-semibold">퀴즈를 불러오는 중이에요.</div>
        </div>
    )
}

export default Loading;