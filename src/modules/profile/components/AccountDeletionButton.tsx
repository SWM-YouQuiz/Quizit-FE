"use client";
import { Rightarrow } from "@/components/svgs";
import { deleteToken } from "@/modules/serverActions";
import { useRouter } from "next/navigation";
import { getUserDeletion } from "@/modules/profile/serverApiActions";
import { QuizContext } from "@/lib/context/Context";
import { useContext, useState } from "react";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

const description = `
    하단의 계정 삭제 버튼을 누르면 당신의 계정과 관련된 데이터가 전부 삭제됩니다. 계정 삭제는 취소할 수 없습니다.
`;

const AccountDeletionButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const { user, accessToken } = useContext(QuizContext);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleClick = async () => {
        if (!user) return;
        await getUserDeletion({
            provider: user.provider.toLowerCase(),
            accessToken,
        });
        router.replace("/auth/login");
        deleteToken();
    };

    if (!user) return null;

    return (
        <>
            <div className="flex justify-between items-center h-[52px] px-5 bg-white" onClick={openModal}>
                <div className="text-[17px] text-secondary-900">회원 탈퇴</div>
                <Rightarrow />
            </div>
            <Modal onClose={closeModal} open={isModalOpen}>
                <div className="flex flex-col justify-between space-y-2.5 overflow-auto">
                    <p className="break-keep text-secondary-900 text-sm">{description}</p>
                    <Link
                        href={`/api/auth/oauth2/revoke/${user.provider.toLowerCase()}`}
                        className="rounded-xl h-12 w-full flex items-center justify-center px-4 text-base bg-error text-white font-semibold"
                        onClick={handleClick}
                    >
                        회원 탈퇴
                    </Link>
                </div>
            </Modal>
        </>
    );
};

export default AccountDeletionButton;
