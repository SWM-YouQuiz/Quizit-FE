

export const reactChapterDummy: Chapter[] = [
    {
        name: "첫 컴포넌트",
        context: "React 컴포넌트의 개념과 React 컴포넌트의 작성 방법"
    },
    {
        name: "컴포넌트의 importing과 exporting",
        context: "컴포넌트의 재사용성 및 모듈화를 위한 파일 분리, import와 export 방법"
    },
    {
        name: "JSX로 마크업 작성",
        context: "React와 JSX의 관계, JSX와 HTML의 차이, JSX로 정보 표현하는 방법"
    },
    {
        name: "중괄호를 사용한 JSX의 자바스크립트",
        context: "JSX에서 큰따옴표와 중괄호의 사용, JavaScript 변수와 함수 호출, 객체 사용 방법 이해 및 적용"
    },
    {
        name: "컴포넌트에 props 전달하기",
        context: "React의 props 전달, 읽기, 기본값 설정, JSX 전달, 그리고 props의 변화 이해하기"
    },
    {
        name: "조건부 렌더링",
        context: "React에서 JSX를 조건적으로 렌더링하는 방법"
    },
    {
        name: "렌더링 리스트들",
        context: "데이터 배열에서 컴포넌트 생성과 필터링을 위해 자바스크립트와 React를 활용하는 방법"
    },
    {
        name: "렌더링 리스트들",
        context: "컴포넌트를 순수하게 유지하는 방법과 중요성 이해"
    }
]

type ChapterDummy = {
    [CourseName: string]: Chapter[]
}
export const chapterDummy: ChapterDummy = {
    react: reactChapterDummy
}