import {Quiz} from "@/modules/quiz/types";

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
export const quizDummy: Quiz[] = [
    {
        content: `2. 다음 TypeScript 코드에서 **오류**를 찾아주세요.
    
    \`\`\`tsx
    
    class Animal {
      speak() {
        console.log("The animal makes a sound");
      }
    }
    class Dog extends Animal {
      speak() {
        console.log("The dog barks");
      }
    }
    const myDog: Animal = new Dog();
    myDog.speak();
    
      class Animal {
      speak() {
        console.log("The animal makes a sound");
      }
    }
    class Dog extends Animal {
      speak() {
        console.log("The dog barks");
      }
    }
    const myDog: Animal = new Dog();
    myDog.speak();
    
    \`\`\``,
        items: [
            {
                item_content: "클래스 선언이 잘못됨"
            },
            {
                item_content: "클래스 상속이 잘못됨"
            },
            {
                item_content: "상수 선언이 잘못됨"
            },
            {
                item_content: "오류 없음"
            }
        ],
        answer: 3
    },
    {
        content: `JavaScript에서 호이스팅(Hoisting)에 대한 설명으로 옳은 것은 무엇입니까?`,
        items: [
            {
                item_content: "변수와 함수 선언을 현재 스코프의 최상단으로 끌어올리는 행위"
            },
            {
                item_content: "함수를 현재 스코프에서 순서를 앞으로 끌어올려 먼저 실행하는 것"
            },
            {
                item_content: "변수를 전역 스코프로 이동시키는 것"
            },
            {
                item_content: "함수 내부의 변수를 함수 외부로 끌어내는 행위"
            }
        ],
        answer: 0
    },
    {
        content: "1. **Server Components**의 장점에 대한 설명으로 옳지 않은 것은 무엇입니까?\n",
        items: [
            {
                item_content: "데이터 가져오기를 서버에 가깝게 이동할 수 있습니다."
            },
            {
                item_content: "클라이언트 JavaScript 번들 크기에 영향을 미치는 큰 의존성을 서버에 유지할 수 있습니다."
            },
            {
                item_content: "초기 페이지 로드가 빠릅니다."
            },
            {
                item_content: "응용 프로그램이 성장함에 따라 클라이언트 측 JavaScript 번들 크기가 증가합니다."
            }
        ],
        answer: 3
    },
        {
            "content": "1. **Server Components**와 **Client Components**의 차이점은 무엇인가요?",
            "items": [
                { "item_content": "Server Components는 서버에서, Client Components는 클라이언트에서 렌더링됩니다." },
                { "item_content": "Server Components는 데이터를 가져올 수 있지만, Client Components는 그렇지 않습니다." },
                { "item_content": "Server Components는 PHP나 Ruby on Rails와 같이 작동하지만, Client Components는 그렇지 않습니다." },
                { "item_content": "Server Components는 정적인 요소만 다룰 수 있지만, Client Components는 동적인 요소를 다룰 수 있습니다." }
            ],
            "answer": 0
        },
        {
            "content": "2. 아래의 코드가 어떤 컴포넌트를 나타내는지 확인해주세요.\n\n```tsx\n'use client'\nimport { useState } from 'react'\n\nexport default function Counter() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  )\n}\n```\n",
            "items": [
                { "item_content": "Server Component" },
                { "item_content": "Client Component" },
                { "item_content": "페이지 컴포넌트" },
                { "item_content": "레이아웃 컴포넌트" }
            ],
            "answer": 1
        },
        {
            "content": "3. **Server Components**가 기본적으로 제공하는 성능 향상의 이점은 무엇인가요?",
            "items": [
                { "item_content": "클라이언트 측 JavaScript 번들 크기 감소" },
                { "item_content": "서버 측 데이터 접근 감소" },
                { "item_content": "클라이언트 측 렌더링 속도 향상" },
                { "item_content": "서버 측 렌더링 속도 감소" }
            ],
            "answer": 0
        },
        {
            "content": "4. 'use client' 지시문에 대한 설명 중 잘못된 것은 무엇인가요?",
            "items": [
                {"item_content": "'use client' 지시문은 파일의 맨 위에 위치해야 합니다."},
                {"item_content": "'use client' 지시문이 있는 모듈에는 Server Components를 사용할 수 없습니다."},
                {"item_content": "'use client' 지시문은 모든 클라이언트 컴포넌트 파일에 있어야 합니다."},
                {"item_content": "'use client' 지시문은 서버와 클라이언트 컴포넌트 모듈 그래프의 경계를 선언하는 규약입니다."}
            ],
            "answer": 2
        },
        {
            "content": "다음 중 **Server Components**를 사용하는 가장 적절한 상황은 무엇입니까?",
            "items": [
                {"item_content": "페이지의 대부분이 비대화형이고, 서버에서 렌더링될 수 있을 때."},
                {"item_content": "작은 대화형 UI 조각을 렌더링해야 할 때."},
                {"item_content": "클라이언트에서 전체 애플리케이션을 렌더링해야 할 때."},
                {"item_content": "페이지의 대부분이 대화형이고, 클라이언트에서 렌더링될 수 있을 때."}
            ],
            "answer": 0
        },
    {
        "content": "다음 중 **Next.js의 server-first approach**에 대한 설명으로 옳지 않은 것은 무엇입니까?",
        "items": [
            {"item_content": "Next.js의 server-first approach는 서버에서 먼저 컴포넌트를 렌더링하는 방식을 의미합니다."},
            {"item_content": "Next.js의 server-first approach는 클라이언트에서 먼저 컴포넌트를 렌더링하는 방식을 의미합니다."},
            {"item_content": "Next.js의 server-first approach는 Server Components와 잘 맞습니다."},
            {"item_content": "Next.js의 server-first approach는 성능 향상을 위해 사용됩니다."}
        ],
        "answer": 1
    },
    {
        "content": "다음은 **Next.js**를 사용하여 작성된 코드입니다. 이 코드의 결과로 예상되는 출력은 무엇입니까? \n\n\`\`\`tsx\nimport React from 'react'\nimport { useRouter } from 'next/router'\n\nexport default function Page() {\n  const router = useRouter()\n\n  return <div>Welcome to {router.pathname}!</div>\n}\n\`\`\`",
        "items": [
            {"item_content": "Welcome to React!"},
            {"item_content": "Welcome to Next.js!"},
            {"item_content": "현재 페이지의 경로를 출력합니다."},
            {"item_content": "이 코드는 오류를 발생시킵니다."}
        ],
        "answer": 2
    },
    {
        "content": "다음 중 **React와 Next.js**를 사용하여 애플리케이션을 구축하는 데 가장 적절한 방법은 무엇입니까?",
        "items": [
            {"item_content": "서버와 클라이언트 모두에서 렌더링을 수행하도록 애플리케이션을 설계합니다."},
            {"item_content": "클라이언트에서만 렌더링을 수행하도록 애플리케이션을 설계합니다."},
            {"item_content": "서버에서만 렌더링을 수행하도록 애플리케이션을 설계합니다."},
            {"item_content": "렌더링은 필요하지 않습니다."}
        ],
        "answer": 0
    },
    {
        "content": "다음 중 **React Server Components**에 대한 설명으로 옳지 않은 것은 무엇입니까?",
        "items": [
            {"item_content": "React Server Components는 서버와 클라이언트를 활용하여 하이브리드 애플리케이션을 구축하는 새로운 멘탈 모델을 도입합니다."},
            {"item_content": "React Server Components는 React가 클라이언트 측에서 전체 애플리케이션을 렌더링하는 대신, 컴포넌트의 목적에 따라 렌더링을 선택할 수 있는 유연성을 제공합니다."},
            {"item_content": "React Server Components는 대부분 비대화형이며, 서버에서 렌더링할 수 있습니다."},
            {"item_content": "React Server Components는 주로 대화형 UI를 렌더링하는 데 사용됩니다."}
        ],
        "answer": 3
    },
    {
        "content": "다음은 **React와 Next.js**를 사용하여 작성된 코드입니다. 이 코드의 결과로 예상되는 출력은 무엇입니까? \n\n\`\`\`tsx\nimport React from 'react'\n\nexport default function Page() {\n  return <div>Welcome to React and Next.js!</div>\n}\n\`\`\`",
        "items": [
            {"item_content": "Welcome to React!"},
            {"item_content": "Welcome to Next.js!"},
            {"item_content": "Welcome to React and Next.js!"},
            {"item_content": "이 코드는 오류를 발생시킵니다."}
        ],
        "answer": 2
    }
]