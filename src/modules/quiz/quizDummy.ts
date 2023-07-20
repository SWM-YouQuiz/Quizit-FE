export const nonData: Quiz = {
    content: `퀴즈가 없습니다.`,
    items: [
            {
                item_content: ""
            },
            {
                item_content: ""
            },
            {
                item_content: ""
            },
            {
                item_content: ""
            }
        ],
    answer: 1
}
export const quizDummy: Quiz[] = [{'content': '**Next.js**를 사용하여 애플리케이션을 구축하려면, 어떤 React의 새로운 기능을 알고 있어야 합니까?',
    'items': [{'item_content': 'Suspense'},
        {'item_content': 'Hooks'},
        {'item_content': 'Server Components'},
        {'item_content': 'Concurrent Mode'}],
    'answer': 2},
    {'content': '다음 중 **Server Components**와 관련된 설명으로 올바른 것은 무엇입니까?',
        'items': [{'item_content': 'Server Components는 클라이언트에서만 동작합니다.'},
            {'item_content': 'Server Components는 데이터를 더 빨리 가져올 수 있습니다.'},
            {'item_content': 'Server Components는 React의 오래된 기능입니다.'},
            {'item_content': 'Server Components는 클라이언트 측 JavaScript 번들 크기를 증가시킵니다.'}],
        'answer': 1},
    {'content': '다음 코드는 Server Component를 사용한 예시입니다. 이 코드의 출력 결과는 무엇일까요?\n```jsx\nfunction MyComponent() {\n  const data = useServerData(fetchData);\n  return <div>{data}</div>;\n}\n```',
        'items': [{'item_content': '함수 fetchData의 반환 값'},
            {'item_content': '에러 메시지'},
            {'item_content': "'useServerData'라는 문자열"},
            {'item_content': "'fetchData'라는 문자열"}],
        'answer': 0},
    {'content': '`useServerData`는 어떤 종류의 React hook일까요?\n```jsx\nfunction MyComponent() {\n  const data = useServerData(fetchData);\n  return <div>{data}</div>;\n}\n```',
        'items': [{'item_content': 'Built-in hook'},
            {'item_content': 'Custom hook'},
            {'item_content': 'Server Component hook'},
            {'item_content': 'Client Component hook'}],
        'answer': 2},
    {'content': '`useServerData` hook을 사용하여 서버 데이터를 가져오는 Server Component를 생성했습니다. 이 컴포넌트가 브라우저에서 클라이언트 측에서 렌더링되는 경우 어떤 일이 발생하나요?\n```jsx\nfunction MyComponent() {\n  const data = useServerData(fetchData);\n  return <div>{data}</div>;\n}\n```',
        'items': [{'item_content': '컴포넌트는 정상적으로 렌더링됩니다.'},
            {'item_content': '컴포넌트는 렌더링되지 않습니다.'},
            {'item_content': '데이터는 렌더링되지 않지만, 컴포넌트는 렌더링됩니다.'},
            {'item_content': '에러가 발생합니다.'}],
        'answer': 3},
    {'content': '다음 코드는 어떤 타입의 컴포넌트를 생성합니까?\n```jsx\nfunction MyComponent() {\n  const data = useClientData(fetchData);\n  return <div>{data}</div>;\n}\n```',
        'items': [{'item_content': 'Server Component'},
            {'item_content': 'Client Component'},
            {'item_content': 'Shared Component'},
            {'item_content': 'Legacy Component'}],
        'answer': 1},
    {'content': 'React에서 **Server Components**와 **Client Components**의 주요 차이점은 무엇입니까?',
        'items': [{'item_content': 'Server Components는 서버에서, Client Components는 클라이언트에서 실행됩니다.'},
            {'item_content': 'Server Components는 JavaScript를 사용하고, Client Components는 TypeScript를 사용합니다.'},
            {'item_content': 'Server Components는 상태를 가질 수 없지만, Client Components는 상태를 가질 수 있습니다.'},
            {'item_content': 'Server Components는 React를 사용하고, Client Components는 Vue.js를 사용합니다.'}],
        'answer': 0}]