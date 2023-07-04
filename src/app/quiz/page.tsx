type Quiz = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}
const getQuiz = async (): Promise<Quiz[]> => {
    return fetch(`${process.env.NEXT_URL}/api/quiz?id=2`)
        .then((res) => res.json())
        .then((json) => json.data)
}
const Quiz = async () => {
    const quizes = await getQuiz();

    return (
        <div>
            <h1>This is Quiz!</h1>
            <p>{JSON.stringify(quizes)}</p>
        </div>

    )
}

export default Quiz;