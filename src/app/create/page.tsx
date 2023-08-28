import Ready from "@/components/Ready";
import {Header} from "@/components/Header";
import {Alert} from "@/components/svgs";

const CreatePage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header>
                <div className="font-bold">생성</div>
                <Alert/>
            </Header>
            <div className="flex-grow bg-bg-primary overflow-y-auto p-5">
                <Ready/>
            </div>
        </div>
    )
}

export default CreatePage;