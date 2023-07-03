
import React from "react";
import Link from "next/link";

export default async function Home() {
    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <Link href={"/login"}>
                    link to login
                </Link>
            </div>
        </main>
    );
}
