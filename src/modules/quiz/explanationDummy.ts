import Explanation from "@/app/quiz/[id]/explanation";

export const noData: Explanation = {
    explanation: "해설이 없습니다."
}

export const explanationDummy: Explanation[] = [{'explanation': '`fetch()`는 데이터를 가져오는 데 사용되며, 서버 컴포넌트에서 데이터를 전송하는 데 사용되지 않습니다.'},
    {'explanation': '`fetchData` 함수는 서버에서 응답한 JSON 데이터를 반환합니다. `response.json()`은 응답 본문을 JSON으로 해석하여 반환합니다.'},
    {'explanation': 'Next.js는 `fetch`를 사용할 때 모든 요청을 자동으로 캐싱하지 않습니다. 각 요청이 자체 캐싱과 재검증을 설정할 수 있도록 `fetch` 옵션 객체를 확장합니다.'},
    {'explanation': "`await` 키워드는 Promise가 해결될 때까지 실행을 일시 중단하므로, 로그는 'Fetching data...', 'Data fetched', 'Data processed' 순서로 출력됩니다."},
    {'explanation': 'Next.js는 `fetch()`를 사용할 때 자동으로 요청을 캐싱하고 재검증하지 않습니다. 각 요청이 자체 캐싱과 재검증을 설정할 수 있도록 `fetch` 옵션 객체를 확장합니다.'},
    {'explanation': '`fetchData` 함수에서 `response` 변수는 `fetch` 요청의 Promise 결과를 받습니다. 이후 `response.json()`을 통해 JSON 데이터를 추출할 수 있습니다.'},
    {'explanation': '`fetch()` 웹 API는 Next.js 서버 컴포넌트에서 데이터를 가져오는 데 사용할 수 있습니다. Next.js App Router를 사용하면 React 컴포넌트에서 직접 데이터를 가져올 수 있습니다.'},
    {'explanation': '`getData` 함수는 서버에서 응답한 HTTP 상태 코드를 반환합니다. `response.status`는 HTTP 응답의 상태 코드를 반환합니다.'}]