"use client"
import {signOut} from "next-auth/react";

const signoutButton = () => {
    return (
        <button className="block" onClick={() => signOut()}>로그아웃</button>
    )
}

export default signoutButton;
