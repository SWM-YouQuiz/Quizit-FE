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
export const quizDummy: Quiz[] = [{'content': '`fetch()` 웹 API와 **React Server Components** 위에 구축된 데이터 가져오기의 특징으로 옳지 않은 것은 무엇입니까?',
    'items': [{'item_content': '`fetch()`를 사용하면 요청이 자동으로 중복 제거됩니다.'},
        {'item_content': 'Next.js는 각 요청이 자체 캐싱과 재검증을 설정할 수 있도록 `fetch` 옵션 객체를 확장합니다.'},
        {'item_content': '`fetch()` 웹 API는 서버 컴포넌트에서 데이터를 가져오는 데 사용할 수 있습니다.'},
        {'item_content': '`fetch()`는 서버 컴포넌트에서 데이터를 전송하는 데 사용됩니다.'}],
    'answer': 3},
    {'content': "다음 **JavaScript 코드**에서 `fetchData` 함수가 어떤 값을 반환하게 되는지 예측해보세요.\n\n```tsx\nasync function fetchData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  return data;\n}\n```\n",
        'items': [{'item_content': '`fetch` 함수의 Promise 결과'},
            {'item_content': '서버에서 응답한 HTTP 상태 코드'},
            {'item_content': '서버에서 응답한 JSON 데이터'},
            {'item_content': '서버에 요청을 보내는 데 사용된 URL'}],
        'answer': 2},
    {'content': 'Next.js에서의 **데이터 가져오기**에 대한 설명으로 옳지 않은 것은 무엇입니까?',
        'items': [{'item_content': 'Next.js App Router를 사용하면 React 컴포넌트에서 직접 데이터를 가져올 수 있습니다.'},
            {'item_content': '데이터 가져오기는 `fetch()` 웹 API와 React Server Components 위에 구축되어 있습니다.'},
            {'item_content': 'Next.js는 `fetch`를 사용할 때 모든 요청을 자동으로 캐싱합니다.'},
            {'item_content': '`async`와 `await`를 사용하여 서버 컴포넌트에서 데이터를 가져올 수 있습니다.'}],
        'answer': 2},
    {'content': "다음 **JavaScript 코드**에서 `getData` 함수가 실행되면 어떤 순서의 로그가 출력되는지 예측해보세요.\n\n```tsx\nasync function getData() {\n  console.log('Fetching data...');\n  const response = await fetch('https://api.example.com/data');\n  console.log('Data fetched');\n  const data = await response.json();\n  console.log('Data processed');\n}\n```\n",
        'items': [{'item_content': 'Fetching data... -> Data fetched -> Data processed'},
            {'item_content': 'Fetching data... -> Data processed -> Data fetched'},
            {'item_content': 'Data fetched -> Fetching data... -> Data processed'},
            {'item_content': 'Data fetched -> Data processed -> Fetching data...'}],
        'answer': 0},{'content': '다음 중 **Next.js**에서 `fetch()` 웹 API를 사용하는 방법에 대한 설명으로 옳지 않은 것은 무엇입니까?',
        'items': [{'item_content': '`fetch()`를 사용하여 서버에서 데이터를 가져올 수 있습니다.'},
            {'item_content': '`fetch()`는 Promise를 반환하므로 `await`를 사용하여 응답을 대기할 수 있습니다.'},
            {'item_content': 'Next.js는 `fetch()`를 사용할 때 자동으로 요청을 캐싱하고 재검증합니다.'},
            {'item_content': '`fetch()`를 사용하여 JSON 응답을 처리할 수 있습니다.'}],
        'answer': 2},
    {'content': "다음 **JavaScript 코드**에서 `fetchData` 함수의 `response` 변수의 역할은 무엇입니까?\n\n```tsx\nasync function fetchData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  return data;\n}\n```\n",
        'items': [{'item_content': '`fetch` 요청의 Promise 결과를 받습니다.'},
            {'item_content': '서버에서 반환한 JSON 데이터를 담습니다.'},
            {'item_content': '`fetch` 요청을 보내는 데 사용된 URL을 담습니다.'},
            {'item_content': '서버에서 반환한 HTTP 상태 코드를 담습니다.'}],
        'answer': 0},
    {'content': 'Next.js의 **데이터 가져오기**에 대한 설명으로 옳은 것은 무엇입니까?',
        'items': [{'item_content': 'Next.js는 `fetch()`를 사용하여 요청을 자동으로 캐싱합니다.'},
            {'item_content': '`fetch()` 웹 API는 Next.js 서버 컴포넌트에서 데이터를 가져오는 데 사용할 수 있습니다.'},
            {'item_content': 'Next.js App Router는 React 컴포넌트에서 직접 데이터를 가져오는 것을 지원하지 않습니다.'},
            {'item_content': '`fetch()`는 데이터를 가져오는 데 사용되지 않습니다.'}],
        'answer': 1},
    {'content': "다음 **JavaScript 코드**에서 `getData` 함수가 실행되면 어떤 값이 반환되는지 예측해보세요.\n\n```tsx\nasync function getData() {\n  const response = await fetch('https://api.example.com/data');\n  return response.status;\n}\n```\n",
        'items': [{'item_content': '`fetch` 함수의 Promise 결과'},
            {'item_content': '서버에서 응답한 HTTP 상태 코드'},
            {'item_content': '서버에서 응답한 JSON 데이터'},
            {'item_content': '서버에 요청을 보내는 데 사용된 URL'}],
        'answer': 1}]