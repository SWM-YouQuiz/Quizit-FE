import Explanation from "@/app/quiz/[id]/explanation";

export const noData: Explanation = {
    explanation: "해설이 없습니다."
}

export const explanationDummy: Explanation[] = [{'explanation': 'Next.js는 React 기반의 프레임워크입니다. Next.js를 사용하려면 React의 새로운 기능인 Server Components를 알아야 합니다. 이는 서버에서 컴포넌트를 렌더링하고 결과를 클라이언트에 보내는 새로운 방식입니다.'},
    {'explanation': 'Server Components는 데이터를 더 빨리 가져올 수 있습니다. 이는 Server Components가 서버에서 실행되므로 데이터 소스에 더 가까워질 수 있기 때문입니다. 이로 인해 효율성이 향상되고 불필요한 클라이언트 측 코드가 줄어듭니다.'},
    {'explanation': '이 코드는 Server Component의 예시입니다. `useServerData`라는 훅을 사용하여 서버에서 데이터를 가져옵니다. 이 훅은 `fetchData`라는 함수를 인자로 받아 데이터를 가져옵니다. 따라서 이 컴포넌트의 출력 결과는 `fetchData`의 반환 값입니다.'},
    {'explanation': '`useServerData`는 Server Component hook입니다. 이 hook은 서버에서 데이터를 가져오는 데 사용됩니다. 이 예제에서는 `fetchData`라는 함수를 `useServerData`에 전달하여 서버에서 데이터를 가져옵니다.'},
    {'explanation': 'Server Component는 브라우저에서 클라이언트 측에서 렌더링할 수 없습니다. `useServerData` hook은 서버에서만 사용할 수 있으므로, 이 hook을 사용하는 컴포넌트를 클라이언트에서 렌더링하려고 하면 에러가 발생합니다.'},
    {'explanation': '이 코드는 Client Component를 생성합니다. `useClientData`라는 훅을 사용하여 데이터를 가져옵니다. 이는 클라이언트에서 실행되는 컴포넌트를 의미하며, 서버에서 데이터를 사전에 가져오지 않습니다.'},
    {'explanation': 'Server Components와 Client Components의 주요 차이점은 실행 위치입니다. Server Components는 서버에서 실행되고, 결과를 클라이언트에 보내줍니다. 반면, Client Components는 브라우저에서 실행되며, 서버에서 사전 렌더링되지 않습니다.'}]