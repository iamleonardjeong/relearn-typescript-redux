// Ducks 패턴 사용
// Ducks 패턴에서는 편의성을 위하여 액션의 type, 액션 생성함수, 리듀서를 모두 한 파일에 작성

// 1. 액션 type 선언 - 리덕스 액션안에 들어가게 될 type값
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;
// as const는 const assertions라는 TypeScript 문법 이 문법을 사용하면 추후 액션 생성함수를 통해 액션 객체를 만들게 됐을 때 type의 TypeScript 타입이 string 이 되지 않고 실제 값을 가르킨다.

// 2. 액션 생성 함수 선언
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});
// increaseBy의 경우 diff 라는 값을 파라미터로 받아 payload 값으로 설정한다. 이는 FSA 규칙을 따르기 위함이다.

// 3. 액션 객체들에 대한 type 준비하기
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;
// 여기서 사용된 ReturnType은 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입이다.
// type 값들을 선언 할 때 as const 키워드를 사용하지 않으면 string 으로 처리되어 리듀서를 제대로 구현할 수 없다.

// 4. 상태의 타입과 상태의 초기값 선언
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// 5. 리듀서 작성하기
function counter(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
// case 부분에서 액션의 type 값에 유효하지 않은 값을 넣게 된다면 오류가 난다.
// 추가적으로 case 에 따라 액션 안에 어떤 값이 들어있는지 알 수 있다.
