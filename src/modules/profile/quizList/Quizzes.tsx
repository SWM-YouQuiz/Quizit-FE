import QuizCard from "@/modules/profile/components/QuizCard";

const Quizzes = ({quizzes}: {quizzes: Quiz[]}) => {
    return (
        <>
        {
            quizzes.map(quiz => (
                <QuizCard key={quiz.id} alt="courseName" imageUrl={"next.svg"} path="react > 기본 개념" title="제목"/>
            ))
        }
        </>
    )
}

export default Quizzes;