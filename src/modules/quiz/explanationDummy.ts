import Explanation from "@/app/quiz/[id]/explanation";

export const noData: Explanation = {
    explanation: "해설이 없습니다."
}

export const explanationDummy: Explanation[] =

    [{'explanation': '이 코드는 Spring Boot 애플리케이션의 기본 구조로, 클래스와 메서드 선언, 어노테이션 사용이 모두 올바르게 이루어져 있습니다.'},
    {'explanation': '`spring-boot-starter-webflux` 모듈은 비동기 네트워킹 라이브러리를 제공하고, Reactive Web 애플리케이션 개발에 사용됩니다. 전통적인 서블릿 기반의 웹 애플리케이션 개발에는 사용되지 않습니다.'},
    {'explanation': 'Spring Boot는 Tomcat, Jetty, Undertow, 그리고 Netty와 같은 임베디드 서버를 지원합니다. 이들 모두 HTTP 서버로 사용 가능하므로, Netty는 임베디드 서버로 사용할 수 있습니다.'},
    {'explanation': 'Java에서 메인 메서드의 서명은 `public static void main(String[] args)`입니다. 이 메서드는 자바 애플리케이션의 진입점 역할을 합니다.'},
    {'explanation': '이 코드는 Spring Boot를 사용하여 RESTful 웹 서비스를 생성하는 예시로, 클래스와 메서드 선언, 어노테이션 사용이 모두 올바르게 이루어져 있습니다.'},
    {'explanation': '`spring-boot-starter-web` 모듈은 전통적인 서블릿 기반의 웹 애플리케이션 개발에 사용됩니다. 비동기 네트워킹 라이브러리 제공이나 Reactive Web 애플리케이션 개발, Spring WebFlux 지원은 이 모듈의 기능이 아닙니다.'},
    {'explanation': 'Spring Boot 웹 애플리케이션 개발에는 주로 Tomcat, Jetty, Netty 등의 임베디드 서버가 사용됩니다. Apache는 이러한 목적으로 일반적으로 사용되지 않습니다.'},
    {'explanation': '이 코드는 Spring Boot 애플리케이션의 기본 구조로, 클래스와 메서드 선언, 어노테이션 사용이 모두 올바르게 이루어져 있습니다.'}]

// [{'explanation': 'Server Components는 서버에서 렌더링되며, Client Components는 클라이언트에서 렌더링됩니다. 이 차이는 각 컴포넌트의 사용 케이스와 성능에 영향을 미칩니다.'},
// {'explanation': 'Next.js는 서버 사이드 렌더링(SSR)을 지원하여 애플리케이션의 초기 로드 시간을 줄일 수 있습니다. 이 외에도 Next.js는 라우팅, 코드 분할 등 다양한 기능을 제공합니다.'},
// {'explanation': 'Server Components는 서버에서 렌더링되기 때문에 클라이언트의 부하를 줄일 수 있습니다. 또한, 클라이언트 측 JavaScript 번들의 크기를 줄일 수 있어, 애플리케이션의 성능을 향상시킬 수 있습니다.'},
// {'explanation': '이 JavaScript 코드는 React의 상태 훅인 useState를 사용한 함수형 컴포넌트입니다. 코드는 잘 작성되어 있으며, 오류가 없습니다.'},
// {'explanation': '이 JavaScript 코드는 React의 상태 훅인 useState와 생명주기 훅인 useEffect를 사용한 함수형 컴포넌트입니다. useEffect 함수는 의존성 배열이 없으므로, 컴포넌트가 리렌더링될 때마다 실행됩니다. 이는 의도한 동작이 아닐 수 있습니다.'},
// {'explanation': 'React와 Next.js의 주요 차이점 중 하나는 렌더링 방식입니다. React는 클라이언트 사이드 렌더링을 지원하는 반면, Next.js는 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원합니다. 이로 인해 Next.js는 초기 페이지 로드 시간을 개선하고 SEO를 향상시킬 수 있습니다.'},
// {'explanation': 'Next.js는 파일 기반 라우팅을 지원합니다. 이는 `pages` 디렉토리에 있는 JavaScript 파일을 사용하여 구현됩니다. 각 파일은 해당 파일의 경로에 따라 URL 경로를 자동으로 생성합니다.'}]
//