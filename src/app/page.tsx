import Image from 'next/image'
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex-grow p-4 relative">
            <p>This is main</p>
            <Link href="/quiz/0">go to Quiz</Link>
        </main>
    )
}
