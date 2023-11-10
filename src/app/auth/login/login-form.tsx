"use client";

import Link from "next/link";
import Image from "next/image";

type Inputs = {
    email: string;
    password: string;
};

const googleImgSrc = `/icons/oauth/google.svg`;
const kakaoImgSrc = `/icons/oauth/kakao.svg`;
const appleImgSrc = `/icons/oauth/apple.svg`;

const googleOAuthUrl = `/api/oauth2/authorization/google`;
const kakaoOAuthUrl = `/api/oauth2/authorization/kakao`;
const appleOAuthUrl = `/api/oauth2/authorization/apple`;

const LoginForm = () => {
    return (
        <div className="container mx-auto">
            <div className="relative my-4 flex justify-between">
                <div className="flex w-full items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-2 text-sm text-secondary-50 whitespace-nowrap">다음으로 로그인</span>
                </div>
                <div className="flex w-full items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
            </div>

            <div className="w-full flex justify-evenly">
                <Link
                    href={googleOAuthUrl}
                    prefetch={false}
                    className="flex items-center justify-between bg-white border border-gray-300 rounded px-0 py-0 h-14 w-14 max-w-full min-w-min cursor-pointer transition-all ease-in-out duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <div className="flex items-center justify-center w-full h-full p-3">
                        <Image className="block" src={googleImgSrc} alt="구글 로그인 버튼 이미지" width={56} height={56} />
                    </div>
                </Link>
                <Link
                    href={kakaoOAuthUrl}
                    prefetch={false}
                    className="flex items-center justify-between rounded px-0 py-0 h-14 w-14 max-w-full min-w-min cursor-pointer transition-all ease-in-out duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-[#fae300]"
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <Image className="block" src={kakaoImgSrc} alt="카카오 로그인 버튼 이미지" width={56} height={56} />
                    </div>
                </Link>
                <Link
                    href={appleOAuthUrl}
                    prefetch={false}
                    className="flex items-center justify-between rounded px-0 py-0 h-14 w-14 max-w-full min-w-min cursor-pointer transition-all ease-in-out duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-black"
                >
                    <Image src={appleImgSrc} alt="애플 로그인 버튼 이미지" width={56} height={56} />
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
