import {Quiz} from "@/modules/quiz/types";

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
        answer: 2
    },
    {
        content: `2. 다음 TypeScript 코드에서 **오류**를 찾아주세요.`,
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
        answer: 1
    }
]