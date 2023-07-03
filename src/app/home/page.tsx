"use client"

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const handleClick = () => {
    signOut({
        callbackUrl: "/login"
    })
}
const Home = () => {
    const {data: session} = useSession();
    console.log("session", session);

    return (
        <div>

            <div>this is home!</div>
            <div>
                <button onClick={() => handleClick()}>Logout</button>
            </div>
            <div>
                <Link href={"/"}>root</Link>
            </div>
            <div>
                <Link href={"/home/curriculum"}>curriculum</Link>
            </div>

        </div>
    )
}

export default Home;