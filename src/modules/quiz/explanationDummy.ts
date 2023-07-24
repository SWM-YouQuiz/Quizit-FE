import Explanation from "@/app/quiz/[id]/explanation";

export const noData: Explanation = {
    explanation: "해설이 없습니다."
}

export const explanationDummy: Explanation[] = [{'explanation': 'Python의 `list.append(x)` 메서드는 리스트의 끝에 새로운 항목 x를 추가하는 기능을 합니다. 이 메서드를 사용하면 특정 리스트에 새로운 요소를 손쉽게 추가할 수 있습니다.'},
    {'explanation': 'Python의 `list.extend(iterable)` 메서드는 iterable의 모든 항목을 리스트의 끝에 추가하는 기능을 합니다. 이 메서드를 사용하면 한 리스트의 요소를 다른 리스트에 추가할 수 있습니다.'},
    {'explanation': 'Python의 `list.insert(i, x)` 메서드는 리스트의 특정 위치에 새로운 항목을 추가하는 기능을 합니다. 이 메서드를 사용하면 리스트의 원하는 위치에 새로운 요소를 삽입할 수 있습니다.'},
    {'explanation': '해당 코드는 Python의 `for` 반복문과 `list.append(x)` 메서드를 이용하여 list2의 모든 항목을 list1의 끝에 추가하는 작업을 수행합니다. 이는 `list.extend(iterable)` 메서드와 같은 결과를 생성합니다.'},
    {'explanation': 'Python의 `list.append(x)` 메서드는 리스트의 끝에 항목 x를 추가하는 기능을 합니다. 반면에 `list.extend(x)` 메서드는 리스트의 끝에 iterable의 모든 항목을 추가하는 기능을 합니다.'},
    {'explanation': 'Python의 `list.insert(i, x)` 메서드는 리스트의 i번째 위치에 항목 x를 추가하는 기능을 합니다. 따라서 이 코드는 리스트 list1의 첫 번째 위치에 0을 추가합니다.'},
    {'explanation': 'Python의 `list.remove(x)` 메서드는 리스트에서 첫 번째로 나타나는 항목 x를 삭제하는 기능을 합니다. 이 메서드를 사용하면 리스트에서 특정 항목을 쉽게 삭제할 수 있습니다.'},
    {'explanation': '해당 코드는 Python의 `list.remove(x)` 메서드를 사용하여 리스트 list1에서 첫 번째로 나타나는 2를 삭제하는 작업을 수행합니다. `remove(x)`는 첫 번째로 나타나는 항목 x만 삭제합니다.'}]