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
export const quizDummy: Quiz[] =

    [{
        'content': '1. 다음 Java 코드에서 오류를 찾아주세요.\n```java\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n```',
        'items': [{'item_content': '클래스 선언이 잘못됨'},
            {'item_content': '메서드 선언이 잘못됨'},
            {'item_content': '어노테이션 사용이 잘못됨'},
            {'item_content': '오류 없음'}],
        'answer': 3
    },
        {
            'content': '`spring-boot-starter-webflux` 모듈에 대한 설명으로 옳지 않은 것은 무엇입니까?',
            'items': [{'item_content': '비동기 네트워킹 라이브러리를 제공합니다.'},
                {'item_content': 'Reactive Web 애플리케이션 개발에 사용됩니다.'},
                {'item_content': '전통적인 서블릿 기반의 웹 애플리케이션 개발에 사용됩니다.'},
                {'item_content': 'Spring WebFlux를 지원합니다.'}],
            'answer': 2
        },
        {
            'content': 'Spring Boot 웹 애플리케이션 개발에 적합한 HTTP 서버를 선택하는 것에 대한 설명으로 옳지 않은 것은 무엇입니까?',
            'items': [{'item_content': 'Tomcat은 임베디드 서버로 사용할 수 있습니다.'},
                {'item_content': 'Jetty는 임베디드 서버로 사용할 수 있습니다.'},
                {'item_content': 'Netty는 임베디드 서버로 사용할 수 없습니다.'},
                {'item_content': 'Undertow는 임베디드 서버로 사용할 수 있습니다.'}],
            'answer': 2
        },
        {
            'content': 'Spring Boot에서 어플리케이션을 실행하는 메서드의 올바른 서명은 무엇입니까?',
            'items': [{'item_content': 'public static void main(String[] args)'},
                {'item_content': 'public static void run(String[] args)'},
                {'item_content': 'public void main(String[] args)'},
                {'item_content': 'public void run(String[] args)'}],
            'answer': 0
        },
        {
            'content': '2. 다음 Java 코드에서 오류를 찾아주세요.\n```java\n@RestController\npublic class HelloWorldController {\n    @RequestMapping("/")\n    public String helloWorld() {\n        return "Hello, World!";\n    }\n}\n```',
            'items': [{'item_content': '클래스 선언이 잘못됨'},
                {'item_content': '메서드 선언이 잘못됨'},
                {'item_content': '어노테이션 사용이 잘못됨'},
                {'item_content': '오류 없음'}],
            'answer': 3
        },
        {
            'content': '`spring-boot-starter-web` 모듈에 대한 설명으로 옳은 것은 무엇입니까?',
            'items': [{'item_content': '비동기 네트워킹 라이브러리를 제공합니다.'},
                {'item_content': 'Reactive Web 애플리케이션 개발에 사용됩니다.'},
                {'item_content': '전통적인 서블릿 기반의 웹 애플리케이션 개발에 사용됩니다.'},
                {'item_content': 'Spring WebFlux를 지원합니다.'}],
            'answer': 2
        },
        {
            'content': 'Spring Boot 웹 애플리케이션 개발에 적합하지 않은 툴은 무엇입니까?',
            'items': [{'item_content': 'Tomcat'},
                {'item_content': 'Jetty'},
                {'item_content': 'Netty'},
                {'item_content': 'Apache'}],
            'answer': 3
        },
        {
            'content': '3. 다음 Java 코드에서 오류를 찾아주세요.\n```java\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n```',
            'items': [{'item_content': '클래스 선언이 잘못됨'},
                {'item_content': '메서드 선언이 잘못됨'},
                {'item_content': '어노테이션 사용이 잘못됨'},
                {'item_content': '오류 없음'}],
            'answer': 3
        }]
// [
//     {'content': '**Server Components**와 **Client Components**의 차이점은 무엇인가요?',
//     'items': [{'item_content': 'Server Components는 서버에서, Client Components는 클라이언트에서 렌더링됩니다.'},
//         {'item_content': 'Server Components는 JavaScript로, Client Components는 TypeScript로 작성됩니다.'},
//         {'item_content': 'Server Components는 실시간 데이터에, Client Components는 정적 데이터에 사용됩니다.'},
//         {'item_content': 'Server Components는 React로, Client Components는 Next.js로 작성됩니다.'}],
//     'answer': 0},
//     {'content': '다음 중 Next.js를 사용하는 이유는 무엇인가요?',
//         'items': [{'item_content': '브라우저 호환성을 개선하기 위해'},
//             {'item_content': '애플리케이션의 초기 로드 시간을 줄이기 위해'},
//             {'item_content': '프론트엔드와 백엔드를 동시에 개발하기 위해'},
//             {'item_content': 'React 컴포넌트를 Java로 변환하기 위해'}],
//         'answer': 1},
//     {'content': '**Server Components**를 사용하면 어떤 장점이 있을까요?',
//         'items': [{'item_content': '클라이언트의 부하를 줄일 수 있습니다.'},
//             {'item_content': '실시간 데이터를 더 빨리 렌더링할 수 있습니다.'},
//             {'item_content': '모든 브라우저에서 동일하게 보여집니다.'},
//             {'item_content': '클라이언트 측 JavaScript 번들 크기를 줄일 수 있습니다.'}],
//         'answer': 0},
//     {'content': '다음 JavaScript 코드에서 **오류**를 찾아주세요.\n```javascript\nfunction MyComponent() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```',
//         'items': [{'item_content': 'useState 함수의 사용이 잘못되었습니다.'},
//             {'item_content': 'setCount 함수의 사용이 잘못되었습니다.'},
//             {'item_content': 'MyComponent 함수의 선언이 잘못되었습니다.'},
//             {'item_content': '오류가 없습니다.'}],
//         'answer': 3},
//     {'content': '다음 JavaScript 코드에서 **오류**를 찾아주세요.\n```javascript\nfunction MyComponent() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```',
//         'items': [{'item_content': 'useState 함수의 사용이 잘못되었습니다.'},
//             {'item_content': 'useEffect 함수의 사용이 잘못되었습니다.'},
//             {'item_content': 'MyComponent 함수의 선언이 잘못되었습니다.'},
//             {'item_content': '오류가 없습니다.'}],
//         'answer': 1},
//     {'content': 'React와 Next.js의 주요 차이점 중 하나는 무엇인가요?',
//         'items': [{'item_content': 'React는 JavaScript 라이브러리이고, Next.js는 JavaScript 프레임워크입니다.'},
//             {'item_content': 'React는 클라이언트 사이드 렌더링만 지원하고, Next.js는 서버 사이드 렌더링과 정적 사이트 생성을 지원합니다.'},
//             {'item_content': 'React는 웹 애플리케이션을 만들기 위한 도구이고, Next.js는 모바일 애플리케이션을 만들기 위한 도구입니다.'},
//             {'item_content': 'React는 TypeScript를 지원하지 않고, Next.js는 TypeScript를 지원합니다.'}],
//         'answer': 1},
//     {'content': 'Next.js에서 페이지 라우팅을 위해 어떤 파일/디렉토리 구조를 사용하나요?',
//         'items': [{'item_content': '`routes` 디렉토리에 있는 JavaScript 파일'},
//             {'item_content': '`src` 디렉토리에 있는 `.route.js` 확장자를 가진 파일'},
//             {'item_content': '`pages` 디렉토리에 있는 JavaScript 파일'},
//             {'item_content': '`components` 디렉토리에 있는 `.page.js` 확장자를 가진 파일'}],
//         'answer': 2}]
